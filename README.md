# aws-node-rest-api-mongodb
This example uses an AWS Lambda using NodeJs. The Lambda exposes four
REST endpoints meant to create, fetch, update or delete a User resource.

The endpoints connect to an instance of mongoDB hosted on [mLab](https://mlab.com/).


# endpoints:
The URLs for the endpoints you could hit from an http client like Paw or
Postman will look something like the following (where 63pwn060d5 is the
api id you obtain after setting up an AWS API on your Lambda):
POST https://63pwn060d5.execute-api.us-east-1.amazonaws.com/dev/user
PUT https://63pwn060d5.execute-api.us-east-1.amazonaws.com/dev/user/{id}
DELETE https://63pwn060d5.execute-api.us-east-1.amazonaws.com/dev/user/{id}
GET https://63pwn060d5.execute-api.us-east-1.amazonaws.com/dev/user/{id}
