#!/bin/sh

# Wait for input file to exist
while [ ! -f /usr/src/app/files/output.txt ]; do
    echo "Waiting for input file..."
    sleep 1
done

# Run the read function and write output to files directory
node main.js 2 > /usr/src/app/files/result.txt 2>&1

# Keep container running if needed
tail -f /dev/null