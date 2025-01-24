node {
    stage('Preparation') {
        catchError(buildResult: 'SUCCESS') {
            echo 'Stopping and removing existing Docker container...'
            sh 'docker stop samplerunning || true'
            sh 'docker rm samplerunning || true'
        }
    }

    stage('Build') {
        parallel(
            NodeJS: {
                dir('src') {  
                    echo 'Installing Node.js dependencies...'
                    sh 'npm install' 
                }
            },
            JavaApp: {
                dir('services') { 
                    echo 'Building Java application with Maven...'
                    sh 'mvn clean install'  
                }
            }
        )
    }

    stage('Test') {
        dir('src') {  
            echo 'Running tests with Jest...'
            sh 'npm install'
            sh 'npm test'
        }
    }

    stage('Docker Build & Deploy') {
        echo 'Building and running Docker container...'
        sh 'docker build -t sampleimage .'
        sh 'docker run -d --name samplerunning -p 8080:8080 sampleimage'
    }
    
    post {
        always {
            echo 'Cleaning up workspace...'
            sh 'docker system prune -f'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
