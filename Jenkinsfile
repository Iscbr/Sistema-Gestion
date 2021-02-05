pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        sh '''cd 
sgestion-server'''
        sh 'mvn clean install'
      }
    }

  }
}