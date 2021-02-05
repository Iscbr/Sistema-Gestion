pipeline {
  agent any
  stages {
    stage('Build') {
      agent any
      steps {
        echo 'Starting building stage...'
        dir(path: './sgestion-server/') {
          sh 'mvn clean'
          sh 'mvn install'
        }

      }
    }

  }
}