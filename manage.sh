#!/bin/bash -xv
pwd
sqlite3 '/home/dell/repos/nextalpr-main/sqlite-data/collection.db' .dump > out.sql
tail -n +3  out.sql > docker-mysql/data/alpr.sql
#rm out.sql
file="sqlite-data/collection.db"
if [ -f "$file" ] ; then
    rm "$file"
fi