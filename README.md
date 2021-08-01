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
- [ ] Finish configuring app user pool
- [ ] Connect cognito to api for auth
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

 > The init sql file is located in the compliment-api repository under the sql directory. copy it to the bastion host and run `psql -h <rds dns> -d postgres -U db_user -f init.sql`. enter the credentials when requested and the db will be initialized with tables and functions to run the serverless application.

## Deploying
- For initial deployments, run `npm run sam:deploy:inital`. This will walk you through options for deployment and create a configuration file for later deployments.
- For susbequent deployments, run `npm run sam:deploy` to deploy the application according sam's configuration file.