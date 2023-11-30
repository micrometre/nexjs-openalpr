#!/bin/bash -xv
file="sqlite-data/collection.db"
#sudo rm public/images/*

if [ -f "$file" ] ; then
    rm "$file"
fi