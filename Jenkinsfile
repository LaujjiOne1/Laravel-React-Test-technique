pipeline {
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timeout(time: 1, unit: 'HOURS')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '====== Cloning repository ======'
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[url: 'https://github.com/LaujjiOne1/Laravel-React-Test-technique.git']]
                ])
            }
        }

        stage('Backend Setup') {
            steps {
                echo '====== Setting up Laravel Backend ======'
                dir('backend') {
                    sh '''
                        echo "Installing Composer dependencies..."
                        composer install --no-dev --optimize-autoloader
                        
                        echo "Creating .env file from .env.example..."
                        cp .env.example .env
                        
                        echo "Generating Laravel app key..."
                        php artisan key:generate
                    '''
                }
            }
        }

        stage('Backend Tests') {
            steps {
                echo '====== Running Backend Tests ======'
                dir('backend') {
                    sh '''
                        echo "Running Laravel tests..."
                        php artisan test --parallel --processes=4 || true
                    '''
                }
            }
        }

        stage('Frontend Setup') {
            steps {
                echo '====== Setting up React Frontend ======'
                dir('frontend') {
                    sh '''
                        echo "Installing NPM dependencies..."
                        npm ci
                        
                        echo "Running ESLint checks..."
                        npm run lint || true
                    '''
                }
            }
        }

        stage('Frontend Build') {
            steps {
                echo '====== Building React Application ======'
                dir('frontend') {
                    sh '''
                        echo "Building Vite application..."
                        npm run build
                    '''
                }
            }
        }

        stage('Docker Build') {
            steps {
                echo '====== Building Docker Images ======'
                sh '''
                    echo "Building backend image..."
                    docker build -t biloki:backend ./backend
                    
                    echo "Building frontend image..."
                    docker build -t biloki:frontend ./frontend
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo '====== Deploying Application ======'
                sh '''
                    echo "Starting Docker containers..."
                    docker-compose down || true
                    docker-compose up -d --build
                    
                    echo "Waiting for services to be ready..."
                    sleep 15
                    
                    echo "Running migrations..."
                    docker-compose exec -T backend php artisan migrate --force
                    
                    echo "Running seeders..."
                    docker-compose exec -T backend php artisan seed:initial
                    
                    echo "Deployment completed successfully!"
                    echo "Frontend: http://localhost:3000"
                    echo "Backend API: http://localhost:8000"
                '''
            }
        }
    }

    post {
        always {
            echo '====== Build finished ======'
            sh 'docker-compose logs --tail=50'
        }
        failure {
            echo 'Build failed! Rolling back...'
            sh 'docker-compose down'
        }
        success {
            echo 'Build and deployment successful!'
        }
    }
}
