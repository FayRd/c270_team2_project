node {
    stage('Preparation') {
catchError(buildResult: 'SUCCESS') {
          sh 'docker stop samplerunning'
          sh 'docker rm samplerunning'
       }
    }

    stage('Build') {
stage('Build') {
        dir('src') {  
            echo 'Installing Node.js dependencies...'
            sh 'npm install' 
        }


        dir('services') { 
            echo 'Building Java application with Maven...'
            sh 'mvn clean install'  
        }
    }
    }

    stage('Test') {
        echo 'Running tests...'
        sh 'npm test'  
    }
}
