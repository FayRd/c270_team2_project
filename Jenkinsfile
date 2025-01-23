pipeline {
    agent any

    environment {
        NODE_VERSION = '20.12.2'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/FayRd/c270_team2_project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def nodeInstalled = sh(script: 'node -v || true', returnStdout: true).trim()
                    if (!nodeInstalled.contains(NODE_VERSION)) {
                        sh 'nvm install ' + NODE_VERSION
                    }
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        success {
            echo 'Build Successful!'
        }
        failure {
            echo 'Build Failed!'
        }
    }
}
