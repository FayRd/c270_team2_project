#!/bin/bash

# Function to check and install sshpass
install_sshpass() {
    if ! command -v sshpass &> /dev/null; then
        echo "sshpass not found. Installing..."
        apt-get update && apt-get install -y sshpass
        if [ $? -ne 0 ]; then
            echo "Error: Failed to install sshpass. Exiting."
            exit 1
        fi
    else
        echo "sshpass is already installed."
    fi
}

# Ensure we have sshpass installed
install_sshpass

# Ensure clean Swarm state
docker info | grep -q "Swarm: active" && docker swarm leave --force
sshpass -p 'password' ssh -o StrictHostKeyChecking=no andreas@192.168.13.129 "docker swarm leave"

# Initialize Swarm on the host
docker swarm init --advertise-addr 192.168.13.128

# Get the worker join token
WORKER_JOIN_TOKEN=$(docker swarm join-token -q worker)

# Add worker node
sshpass -p 'password' ssh -o StrictHostKeyChecking=no andreas@192.168.13.129 \
  "docker swarm join --token $WORKER_JOIN_TOKEN 192.168.13.128:2377"

# Verify nodes
docker node ls

# Clean and clone the repository
if [ -d "/home/andreas/c270_team2_project" ]; then
    echo "Repository already cloned, skipping clone..."
else
    echo "Cloning repository..."
    git clone https://github.com/FayRd/c270_team2_project.git /home/andreas/c270_team2_project
fi

# Verify docker-stack.yml exists under the correct path
if [ ! -f "/home/andreas/docker-stack.yml" ]; then
    echo "Error: docker-stack.yml not found!"
    exit 1
fi

# Deploy the stack
docker stack deploy --compose-file=/home/andreas/docker-stack.yml c270_team2_project_stack

# Verify services
docker stack ls
docker stack services c270_team2_project_stack
docker service ps c270_team2_project_stack_web

# Scale the web service
docker service scale c270_team2_project_stack_web=2

# Confirm scaling
docker stack services c270_team2_project_stack
docker service ps c270_team2_project_stack_web

# Display application URLs
echo "Check application on:"
echo "http://192.168.13.128:7070"
echo "http://192.168.13.129:7070"

