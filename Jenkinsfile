pipeline {
    agent any

    stages {
        stage('Environment Preparation') {
            steps {
               sh '''
                curl -L "https://github.com/docker/compose/releases/download/1.29.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
                chmod u+x /usr/local/bin/docker-compose
                docker --version
                docker-compose --version
                ls
                '''
                }
        }
        stage('Test') {
            steps {
                sh '''
                echo 'Testing..'
                docker-compose build --no-cache
                '''
                }
        }
       
    }
    
    post {
        
        success {
            echo 'Test was succesful!'
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                subject: "Jenkins Build Worked ${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                to: 'bartoszkozlowski515@gmail.com'
         
        }
        
        failure {
            echo 'Failure!'
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                subject: "Jenkins Build Failed${currentBuild.currentResult}: Job ${env.JOB_NAME}",
                to: 'bartoszkozlowski515@gmail.com'
        }
         }
   
}
