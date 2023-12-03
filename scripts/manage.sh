#!/bin/bash -xv
pwd
file="sqlite-data/collection.db"
if [ -f "$file" ] ; then
    rm "$file"
fi
node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'
export NODE_OPTIONS="--max-old-space-size=5120" # Increase to 5 GB
export NODE_OPTIONS="--max-old-space-size=6144" # Increase to 6 GB
export NODE_OPTIONS="--max-old-space-size=7168" # Increase to 7 GB
export NODE_OPTIONS="--max-old-space-size=8192" # Increase to 8 GB
inotifywait -m -r -e  create public/images/

inotifywait --monitor --timefmt '%F %T' --format '%T %w%f %e' --recursive $1 public/images/
inotifywait --monitor --timefmt '%F %T' --format '%T %f' --recursive   -e create public/images/
inotifywait --monitor --timefmt '%F %T' --format '%T %f' --recursive   -e create public/images/
inotifywait --monitor --timefmt '%F %T' --format '%T%w%f' --recursive   -e create public/images/