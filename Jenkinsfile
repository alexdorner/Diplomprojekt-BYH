pipeline { 
	agent any
    stages { 
		stage('Initialize') {
            steps {
                echo "PATH = ${PATH}" 
            }
        }
        stage('Build API') { 
            steps { 
               sh """
					export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
					export PATH=$JAVA_HOME/bin:$PATH
					cd byh-api
					pwd
					mvn compile
				""" 
            }
        }
		stage('Test API') { 
            steps {
				sh """
					export JAVA_HOME=/usr/lib/jvm/java-11-openjdk-amd64
					export PATH=$JAVA_HOME/bin:$PATH
					export SPRING_CONFIG_LOCATION=file:/byh/
					export SPRING_CONFIG_NAME=application,byh
					cd byh-api
					pwd
					mvn test
				"""
            }
        }
		stage('Install Webapplikation') { 
            steps { 
               sh """
					cd bookyourhospital
					pwd
					npm install
				""" 
            }
        }
		stage('Build Webapplikation') { 
            steps { 
               sh """
					cd bookyourhospital
					pwd
					npm run build
				""" 
            }
        }
		stage('Test Webapplikation') { 
            steps {
				sh """
					cd bookyourhospital
					pwd
					npm test -- --watchAll=false
				"""
            }
        }
		stage('Test KIS') { 
            steps {
				sh """
					docker exec KIS bench --site site1.local run-tests --app kis
				"""
            }
        }
    }
	post {
		always {
			emailext attachLog: true, body: """Job: ${env.JOB_NAME}:${env.BUILD_NUMBER}\nStatus: ${currentBuild.result}""",
				subject: "[Jenkins] REPORT ${currentBuild.fullDisplayName} - ${currentBuild.result}",
				to: "BookYourHospital@gmail.com"
		}
	}
}