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
                
                //Sending email with body depending on action effect  (zad. 2.3)              
                emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'mrsuhar420@gmail.com',
                subject: "Building result: ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
                 
                
                  }
                          }
        //Works only if previous stage was succesful (zad. 3)
        stage('Test') {
            when{
                expression{currentBuild.currentResult=="SUCCESS"}
                }
            
            steps {
                echo 'Trying to test project'
                sh 'npm run test'
                emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'mrsuhar420@gmail.com',
                subject: "Testing result: ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
                  }

                      }

            stage('Deploy'){
            steps{
                echo 'Trying to deploy project'
                
                sh 'apt update -y'
                sh 'apt dist-upgrade -y'
                sh 'curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg'
                sh 'apt remove docker-ce docker-ce-cli containerd.io -y'
                sh 'apt update -y'
                sh 'apt dist-upgrade -y'
                sh 'apt-get install docker-ce docker-ce-cli containerd.io -y'
                sh 'apt update -y'
                sh 'apt dist-upgrade -y'
                sh 'docker build -t deltachat-deploy -f Dockerfile.deploy .'

                
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
                subject: "Deploy result: ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
                
         
        }
        
        failure {
            echo 'Test was failed!!!'
            emailext attachLog: true,
                body: "${currentBuild.currentResult}: Job ${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                recipientProviders: [developers(), requestor()],
                to: 'mrsuhar420@gmail.com',
                subject: "Deploy result: ${currentBuild.currentResult}: Job ${env.JOB_NAME}"
                
        }
         }
   
}
