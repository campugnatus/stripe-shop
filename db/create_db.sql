-- SQLite

--
-- Products
--

create table product (
	id text not null primary key, -- we use figma node ids as our product ids
	title text,
	description text,
	price real,
	filename text,
	place integer -- its place in the default order (sort by default)
);


create table tag (
	id text not null primary key
);


-- there's a "m to n relationship" between tags and products, meaning that
-- every product has multiple tags, and every tag has multiple products
-- associated with it

create table tag_product_bridge (
	tag_id text not null references tag,
	product_id text not null references product,
	primary key (tag_id, product_id)
);

create index tag_to_product on tag_product_bridge (tag_id);
create index product_to_tag on tag_product_bridge (product_id);


create table review (
	id integer not null primary key,
	product_id text references product,
	user_id integer references user,
	text text,
	date integer,
	edited integer,
	rating integer,
	unique(product_id, user_id)
);

create index product_to_review on review (product_id);


create view rating as
select
	product_id,
    avg(rating) as rating,
    count(rating) as nratings,
    count(text) as nreviews
from review
group by product_id;




--
-- User, cart
--

create table user (
	id integer not null primary key,
	name text,
	email text unique,
	picture text,
	hash text
);


create table cart (
	id integer not null primary key,
	user_id integer not null references user
);

create table cart_item (
	cart_id integer references cart,
	product_id text references product,
	amount integer
);

create index cart_to_item on cart_item (cart_id);



--
-- Orders
--

create table shop_order ( -- "order" is a keyword
	-- we want to use hard-to-guess ids for orders as they can be viewed by unauthorized users
	id text not null primary key,
	user_id integer references user,
	-- delivery email, can be different from the user's (which might not even be defined)
	email text,
	price real,
	package text -- filename of the .zip file
);

create index user_to_order on shop_order (user_id);


create table order_item (
	id integer not null primary key,
	product_id text references product,
	order_id text references shop_order,
	price real, -- snapshot of the product's price in case it changes
	amount integer
);

create index order_to_item on order_item (order_id);


create table order_update (
	order_id text references shop_order,
	status text,
	date integer -- milliseconds since epoch (i.e. unixtime*1000)
);

create index order_to_update on order_update (order_id);





/*

What I don't like about SQL...

1. 1-to-n relationship requires building an index even for the 'forward' going
queries. In a key-value database the forward queries are super cheap,
and 'backward' queries require an index. Here there's no 'cheap' direction.

E.g. I have an "order" object, and it has "order items" related to it.
It's a 1-n relationship. In a key-value I just store them together in an
object and retrieve them in a single query. Simple, fast.

And if I need to search for an order by an item... well, there's just no such
use case, so not a problem. And if I DO need that - well, only then would I
have to build an index.

In a relational model, however, I have to search for all the order items
related to that order every time I'm trying to retrieve an order. Such a
waste...

2. rowid is nice'n'all, but I want to use my ids as hard-to-guess tokens, and
autoincrement kind of ids cannot be used that way. I want my ids random, not
incremental

*/
