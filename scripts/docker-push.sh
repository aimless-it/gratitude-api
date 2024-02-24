aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <acc#>.dkr.ecr.us-east-1.amazonaws.com/gratitude-functions
docker build -t <acc#>.dkr.ecr.us-east-1.amazonaws.com/gratitude-functions:dev -f lambda.Dockerfile .
docker push <acc#>.dkr.ecr.us-east-1.amazonaws.com/gratitude-functions:dev