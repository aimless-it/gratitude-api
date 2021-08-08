FROM public.ecr.aws/lambda/nodejs:14

COPY src/  /var/task/

RUN npm install

