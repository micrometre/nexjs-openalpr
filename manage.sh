#!/bin/bash -xv
pwd
uptime
uname -r
file="sqlite-data/collection.db"
if [ -f "$file" ] ; then
    rm "$file"
fi