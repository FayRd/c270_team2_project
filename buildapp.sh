#!/bin/bash
rm -rf tempdir

mkdir tempdir
mkdir -p tempdir
mkdir -p tempdir/public/{images,stylesheet}
mkdir -p tempdir/src/{models,routes,services,views,views/partials}

cp app.js tempdir/.
cp config.json tempdir/.
cp package.json tempdir/.
cp package-lock.json tempdir/.

cp -r public/images/* tempdir/public/images/.
cp -r public/stylesheet/* tempdir/public/stylesheet/.
cp -r src/models/* tempdir/src/models/.
cp -r src/routes/* tempdir/src/routes/.
cp -r src/services/* tempdir/src/services/.
cp -r src/views/* tempdir/src/views/.
cp -r src/views/partials/* tempdir/src/views/partials/.

echo "FROM node:16-alpine" >> tempdir/Dockerfile
echo "WORKDIR /app" >> tempdir/Dockerfile
echo "COPY package*.json ./" >> tempdir/Dockerfile
echo "RUN npm install" >> tempdir/Dockerfile
echo "RUN npm install node-fetch" >> tempdir/Dockerfile
echo "COPY . ." >> tempdir/Dockerfile
echo "EXPOSE 80" >> tempdir/Dockerfile
echo "CMD ['npm', 'start']" >> tempdir/Dockerfile

cd tempdir

docker pull -a fayrd/recipe_sql
docker build -t recipe_finder .

docker network create my-app-network
docker run -d -p 3306:3306 --name my-mysql-container --network my-app-network -e MYSQL_ROOT_PASSWORD=123 fayrd/recipe_sql:1.0
docker run -d -p 80:80 --name my-webapp-container --network my-app-network recipe_finder

docker ps -a
