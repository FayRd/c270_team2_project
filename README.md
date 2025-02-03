# How to run the application.
Requirements:
- Ubuntu VM
- Docker tool
- Internet access

## Pull Docker Images
export DOCKERID=fayrd
sudo docker pull -a $DOCKERID/recipe_finder
sudo docker pull -a $DOCKERID/recipe_sql

## Run containers
sudo docker network create my-app-network
sudo docker run -d -p 3306:3306 --name my-mysql-container --network my-app-network -e MYSQL_ROOT_PASSWORD=123 $DOCKERID/recipe_sql:1.0
sudo docker run -d -p 80:80 --name my-webapp-container --network my-app-network $DOCKERID/recipe_finder:3.0

## Find MySQL container IP address
sudo docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-mysql-container

## Configure DB credentials
container_id=$(sudo docker ps -q -f name=my-webapp-container)
sudo docker exec -it $container_id sh
vi config.json

sudo docker restart my-webapp-container
