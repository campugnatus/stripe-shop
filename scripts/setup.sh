#!/bin/bash

# this script contains the first-time setup for the whole project

# it gets run every time the dev server is started, and as such it's supposed
# to be idempotent. If it becomes too much of a hassle to keep it idempotent,
# we'll probably have to refactor it into a separate setup step

# print out every command that's being executed
set -x

# abandon ship at the first sign of trouble
set -e

# init shared environment
[[ -f dev.env ]] || cp example.env dev.env

mkdir -p stripes