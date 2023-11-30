#!/bin/bash -xv
pwd
file="sqlite-data/collection.db"
if [ -f "$file" ] ; then
    rm "$file"
fi