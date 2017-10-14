#!/bin/bash

# Create a new build folder with bundled assets
npm run build

# Copy the contents of the build folder into your S3 bucket and make them publicly available
aws s3 sync build/ s3://www.betterodds.io --delete --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
