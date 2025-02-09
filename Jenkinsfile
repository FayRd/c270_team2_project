pipeline {
    agent any
    environment {
        REPO_URL = 'https://github.com/FayRd/c270_team2_project.git'
        SOURCE_BRANCH = 'fayyadh-dev'
        TARGET_BRANCH = 'dev'
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: "${SOURCE_BRANCH}", url: "${REPO_URL}"
            }
        }
        stage('Run Build') {
            steps {
                build 'BuildAppJob'
            }
        }
        stage('Run Tests') {
            steps {
                build 'TestAppJob'
            }
        }
    }
    post {
        success {
            script {
                echo "Tests passed. Merging ${SOURCE_BRANCH} into ${TARGET_BRANCH}..."
                
                withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
                    sh """
                        git config user.email "fayyadhrasid06@gmail.com"
                        git config user.name "FayRd"
                        git checkout ${TARGET_BRANCH}
                        git pull origin ${TARGET_BRANCH}
                        git merge ${SOURCE_BRANCH}
                        git push https://$GITHUB_TOKEN@github.com/FayRd/c270_team2_project.git ${TARGET_BRANCH}
                    """
                }
            }
        }
        failure {
            echo "Tests failed, merge step will not be executed."
        }
    }
}