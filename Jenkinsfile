pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        echo 'Starting building stage...'
        sh 'ls -l'
        sh 'mvn clean install'
      }
    }

  }
}