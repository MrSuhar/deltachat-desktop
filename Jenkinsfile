pipeline {
    agent any
    stages {
        stage('Building') {
            steps {
                echo 'Trying to build project'
                sh 'apt install npm -y'
                sh 'npm i npm@latest -g'
                sh 'npm fund'
                sh 'npm install'
                sh 'npm run build'
                
                emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'mrsuhar420@gmail.com',
                subject: "Building was succesful ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
                
                emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'mrsuhar420@gmail.com',
                subject: "Building Failed ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
                  }
                          }
        
        stage('Test') {
            steps {
                echo 'Trying to test project'
                sh 'npm run test'
                  }
                      }
       
            }
    
    post {
        
        success {
            echo 'Test was succesful!'
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'mrsuhar420@gmail.com',
                subject: "Jenkins Build Worked ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
                
         
        }
        
        failure {
            echo 'Test was failed!!!'
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'mrsuhar420@gmail.com',
                subject: "Jenkins Build Failed${currentBuild.currentResult}: Job ${env.JOB_NAME}"
                
        }
         }
   
}
