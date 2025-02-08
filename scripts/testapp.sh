if docker logs my-webapp-container | grep "Server listening on port 80. Acess at http://localhost:80"; then
    echo "Website is up!"
    if docker logs my-webapp-container | grep "Connected to MySQL database"; then
        echo "Database is connected!"
        exit 0
    fi
fi
exit 1