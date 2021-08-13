# Gratitude Serverless Back End

## TODO:
- [X] Create API
- [X] Create State Machine
- [ ] Create Kinesis Stream
- [ ] Create Lambda for Stream
- [X] Create openapi doc for api
- [X] iam roles for lambda where necessary
- [X] extract template for nesting and modularization
- [X] Create userpool sms verification
- [X] Create userpool api key
- [X] Finish configuring app user pool
- [X] Connect cognito to api for auth
- [X] Create RDS Lambda proxy for functions to interact with db

## TODO: future
- [ ] Create buildspec.yml for ci/cd
- [X] Create tests for lambdas
- [X] fully configure xray
- [ ] Route53 for domain and https

## Environment configuration
- Need a key pair for bastion host connection named gratitude-bastion

> Even if you don't plan to connect to this instance, it is still needed for the instance to be created.

- aws cli needs to be configured. Install aws cli and run `aws configure` to begin configuration.

> Note: You need an IAM user setup for programmatic access with admin policy attached.

- You will need to ssh into the bastion host and run an initialization script onto the db server for the database to be initialized.

 > The init sql file is located under the sql directory. copy it to the bastion host and run `psql -h <rds dns> -d postgres -U db_user -f init.sql`. You will need to input the password credentials for the rds user. These credentials are stored inside AWS Parameter Store Secrets Manager. Open this service in the aws console, copy the password, and paste the password into the console.

## Deploying
- For initial deployments, run `npm run sam:deploy:inital`. This will walk you through options for deployment and create a configuration file for later deployments.
- For susbequent deployments, run `npm run sam:deploy` to deploy the application according sam's configuration file.

## Usage
You will need to be a user in the Cognito user pool to gather an authentication token to make http requests to the API Gateway.
1. Open your terminal and run `aws cognito-idp sign-up --client-id <client id> --username <username> --password <password [capital and number are required]> --user-attributes Name=email,Value=<some email>`
2. Open your terminal and run `aws cognito-idp initiate-auth --auth-flow USER_PASSWORD_AUTH --client-id <client id found in the app client page> --user-pool-id <user pool id found in user pool general settings> --auth-parameters USERNAME=<username>,PASSWORD=<password> [>> token.json]`
3. Use the id token in the response in the Authorization header of your requests.

## Data
https://docs.google.com/spreadsheets/d/1ZEz53npuQDqVRIo7iifksjLvF9epO2nHIVr-Fp3b_ww/edit?usp=sharing
