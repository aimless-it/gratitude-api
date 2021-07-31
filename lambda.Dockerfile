FROM public.ecr.aws/lambda/nodejs:14

COPY src/handlers  /var/task/

RUN npm install

