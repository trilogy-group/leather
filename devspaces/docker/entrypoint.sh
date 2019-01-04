#!/bin/bash

/etc/init.d/postgresql start

psql -U postgres -c "CREATE USER leather WITH CREATEDB;"

#need this, otherwise container will be terminated after start
tail -f /dev/null
