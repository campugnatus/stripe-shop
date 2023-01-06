# Trying Docker for web development

This was my first experience with Docker. In general, I prefer to keep things minimal, and this project would be just fine without all those Dockers. But I was seeking to try it out.

One of the main promises of Docker is that it solves the infamous "it works on my machine" problem. This yields an obvious benefit when, say, deploying to the cloud, no wonder it's a go-to technology in that space. However, it does sound alluring as a way to set up and keep consistent your development environment, too! The more of your setup you can automate and document in code, the better.

Now, again, for this project this isn't much of a concern as I'm the only developer here, but for teams as large as two people the disparity of runtime environments can easily become a pain in the ass. Setting up uniform dev environments is annoying in itself, and then your team decides to upgrade something, and it turns out you have too old of a Debian on your machine, and in the face of doing a dist-upgrade to keep up with the rest of the team you cowardly download a statically linked binary of the software in question, and now you have two of them in your PATH, and then some other program picks up the wrong one, and so on. An upgrade, as they say, is almost as bad as a fire.

Anyway, with this being the main selling point of Docker, and with [so many developers ostensibly having such a great time with it](https://survey.stackoverflow.co/2022/#section-most-loved-dreaded-and-wanted-other-tools), I thought making this work would be a breeze.



## Architecture

So the simplest thing you can do is do what you do in production and just copy all your source code into a docker image and run it from there, something along these lines:

	FROM node:18
	WORKDIR /app
	COPY package*.json .
	RUN npm install
	COPY . .
	CMD npx vite --host

But that would make us rebuild the image every time we make a change. Docker tries its best to cache the layers (so it won't `npm install` every time), but even with everything cached such a build of my project on my laptop takes about 15 seconds. Compare that to ~100ms reload times that you get with vite + HMR.

The better way would be to avoid the copying and `bind mount` our source into the container. In essence, all we want to do is the following:

	OPTS="-it --rm -v $(pwd):/app -w /app --network stripeshop --env-file dev.env"

	docker network create stripeshop
	docker run $OPTS node:18 npm install
	docker run $OPTS -h app -p 3000:3000 node:18 npx vite --host
	docker run $OPTS -h api -p 3002:3002 node:18 npm run express

Wow, that wasn't so bad!

Here we have two containers: one for serving static content and one for the API. Our working directory is shared between the host and the containers, so all the build artefacts end up available to the host. HMR is working, and it looks like we can go to `localhost:3002` and start developing away!



## However!

There are hitches.

## to root or...?

In the above configuration, everything inside the containers is run by root. Which isn't very hygienic in and of itself and is not recommended in production, but also, running `npm` as root is problematic; you tend to get EACCES errors such as this one during both `npm install` and `npm run`:

	npm ERR! code EACCES
	npm ERR! syscall mkdir
	npm ERR! path /root/.npm/_cacache/tmp
	npm ERR! errno -13
	npm ERR!
	npm ERR! Your cache folder contains root-owned files, due to a bug in
	npm ERR! previous versions of npm which has since been addressed.
	npm ERR!
	npm ERR! To permanently fix this problem, please run:
	npm ERR!   sudo chown -R 1001:1001 "/root/.npm"

Which is a bit baffling at first: how can we, the root(!), get permission denied errors? [As it turns out](https://docs.npmjs.com/cli/v9/using-npm/scripts#user), `npm`, when run by root, drops superuser priveleges at some point and proceeds with the UID of the user owning the current directory. This is done for security reasons, to mitigate the potential damage of a stray postinstall script or something.

Okay, so that `chown` line from the error message should help, right? Well, it doesn't. Why? Running `npm` under `strace` shows us that `npm` hasn't been completely honest with us in its error message. It actually tries to write much more than just `/root/.npm`:

	/root/.node_modules
	/root/.node_libraries
	/root/.npmrc
	/root/.config/configstore/update-notifier-nodemon.json
	... and more

So how about `chown 1001:1001 -R /root`? Yep, this does the job, but I think it goes without saying that you shouldn't do that. Setting the `NPM_CONFIG_PREFIX` variable as advised [here](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) doesn't help either, and neither does `npm config set prefix`.

All right, to hell with root, let's try being a normal user.


## not to root

The official `node` Docker images have a preconfigured user 'node'. So how about

	su node -c 'npm install'

Well, this **might** work! If you get lucky and your host user has UID 1000, you won't even notice there's a problem! But then you go to a different machine - and ka-boom! Permission denied! So much for your solution for "it runs on my machine".

What's going on here? Well...

While the system inside a container doesn't share user info with the host, files shared between the host and the container using bind mounts keep their original permissions and ownership.

So if I mount a directory inside the container, and this directory belongs to the user with UID=1001, inside the container it will still belong to the user 1001, even though there's no user 1001 in the container! The default user 'node' is the first and only user there, and as such it has UID 1000 and no write access to the directory. And we need the access if we are to run `npm install`.

My first reflex was to create the directory `node_modules` manually and give it to the user `node`. This, first of all, is weird, as I end up with files in my working directory that belong to some other user who has nothing to do with any of this. Secondly, this doesn't work anyway, since `npm install` also wants to write `package.json` and `package-lock.json`. You can work around it by using `npm ci` instead, but that won't work for installing individual packages, and is not meant for development in general. Furthermore, there are other files that I want to write, such as my sqlite file.

All in all, I came to the conclusion that I need a user inside the container with the same UID that I have on the host. Basically, we're doing something like what `npm` did when we ran it as root. To avoid doing that every time I run my containers, I put it into a separate build stage in my Dockerfile:

	FROM node:18 as dev
	ARG USERID
	RUN groupmod -g $USERID node
	RUN usermod -u $USERID -g $USERID node
	USER node

The only problem here being that during the build step there's no bind mounts to speak of, so we'll have to pass USERID in the options to `docker build`:

	docker build --build-arg USERID=$(stat -c %u .) --target dev -t stripeshop-dev .

And now we can add the `-u node` option to our OPTS variable and use this new image for our containers instead of the stock `node:18`.

Great! At this point my instinct tells me to wrap it all in a shell script and call it a day, but the Docker way is to use `docker compose`.



## docker compose

At a first glance, what `docker compose` offers is to rewrite your command line options for `docker run` in a yaml format in exchange for another level of abstraction with its own quirks and surprises.

I have three services declared in my .yml file: one for vite, one for express and the third one for them to inherit from. We can specify it as their dependency so it gets built and run automatically whenever we run one of them. We can say `docker compose up` and both services will get up and ready for development, channeling their logs into a single stream. This is nice. I imagine it gets even nicer the more services you have and the more complicated the dependencies between them get.

Now, for the hitches...

1. That USERID variable that I just passed to `docker run` as a build arg now has to be passed through `docker compose`, and it seems that it can't be done explicitly in the command line so we have to pass it through the environment.

1. `docker compose` is distributed both as a standalone binary and as a docker plugin, so on different systems it can be available either as `docker-compose` or `docker compose` and my wrapper script has to account for that.

1. Environment variables that we could previously pass into `docker run` with `--env-file` option now terminate at the .yml file. In order to make them propagate all the way down into the containers, we have to enumerate  them one-by-one with empty values in the `environment` option in the .yml file. Yuck!

1. When running multiple services via `docker compose up`, none of them can receive input on STDOUT, so if any of them are interactive, you'll have to run them one-by-one using `docker compose run`

	1. But then their ports don't get exposed unless you specify the `--service-ports` command line option.

	1. And for some reason they don't see each other on the network unless we  specify their hostnames explicitly using `hostname` option in the .yml

	1. Also, when you `run` a service, it doesn't show its dependencies' output in the logs. Unless you specify `--attach-dependencies`, that is.

Most of what I do with `docker compose` can be easily replicated with a simple shell script. Being a programming language, shell is often more expressive. For example, in shell you can just insert a subshell expression anywhere, whereas in the Compose file you have to juggle environment variables, and at that point you'll wrap everything in a shell script, anyway, so...

One area where `docker compose` has a clear advantage is dependency management. Healthchecks, for example, can't be replicated with shell alone.





## The irreducible degradation of the dev experience

After all, no matter how you spin it, running things in a container won't be the same as running them directly on your host. It's another layer between you and your program and it does get in the way.

The environment inside a container is bare-bones. You don't have any of your command-line tools, your overly customized shell and whatnot. You could bake those into the image, but that's quite a bit of additional setup, and then other developers would have to suffer through your zsh config.

Every time you want to, say, run a script, you can't just open a shell in the working directory. Instead, you have to run another container or `docker exec` a shell in an already running one. You end up with a bunch of different shells in different worlds.

Want to expose something on a not-yet-exposed port? You'll have to stop the container and run it anew, taking down all the shell sessions open in the same container. And the shell history gets reset in-between the runs, as well as the `apt install`s you may have done along the way.

Now, all of that is not the end of the world, but it adds that little extra friction that adds up during the week and then makes you have one beer too many on the friday night.




## Conclusion

Using Docker for development is possible, but it's not a zero-cost abstraction. There's a cost-benefit tradeoff here (as there often is). The configuration gets somewhat complicated with quite a few pitfalls even for a simple project. Nothing insurmountable, but it does take some fight against the tool to shake things into place. You get additional Dockerfile stages, a couple of compose.yml configs, a shell script on top and some environment variables drilling all the way from the top down to the Dockerfile. All of that instead of just

	npm install
	npm run dev
	npm run api

Clearly not worth it. Then again, on a bigger project involving a more elaborate runtime and more developers, it might be worth the hassle.

Overall, I'd say, "you ain't gonna need it". Think of it when managing development environment has become a burden already, proabably not before.