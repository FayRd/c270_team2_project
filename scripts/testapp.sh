#!/bin/bash

# Timeout settings
TIMEOUT=60  # Max wait time in seconds
INTERVAL=5  # Check every 5 seconds
elapsed=0

echo "Waiting for web application to start..."

# Wait until the web app logs show it's running
while [[ $elapsed -lt $TIMEOUT ]]; do
    if docker logs my-webapp-container 2>&1 | grep -q "Server listening on port"; then
        echo "Website is up!"
        
        echo "Waiting for database connection..."
        
        # Check if MySQL connection is established
        if docker logs my-webapp-container 2>&1 | grep -q "Connected to MySQL database"; then
            echo "Database is connected!"
            exit 0
        fi
    fi

    sleep $INTERVAL
    ((elapsed+=INTERVAL))
done

echo "Web application or database connection failed after $TIMEOUT seconds."
exit 1
