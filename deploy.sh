#!/bin/bash

npm run build

aws s3 sync / s3://orchid-judging.com --delete --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers


# aws s3 sync build/ s3://cryptotracker --delete --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
