#!/bin/bash -xv
pwd
sqlite3 '/home/dell/repos/nextalpr-main/sqlite-data/collection.db' .dump > out.sql
file="sqlite-data/collection.db"
if [ -f "$file" ] ; then
    rm "$file"
fi