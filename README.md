# aws-node-rest-api-mongodb
This example is an AWS Lambda using NodeJs. The Lambda exposes four
REST endpoints meant to create, fetch, update or delete a User resource.

The endpoints connect to an instance of mongoDB hosted on [mLab](https://mlab.com/).

To make this work I needed to set up accounts for:
- AWS.
- serverless.com (for easy deploys).
- mLab (cloud mongoDB instance).


# endpoints:
The URLs for the endpoints you could hit from an http client like Paw or
Postman will look something like the following (where random-some-such is the
api id you obtain after setting up an AWS API on your Lambda):

- POST https://random-some-such.execute-api.us-east-1.amazonaws.com/dev/user

- PUT https://random-some-such.execute-api.us-east-1.amazonaws.com/dev/user/{id}

- DELETE https://random-some-such.execute-api.us-east-1.amazonaws.com/dev/user/{id}

- GET https://random-some-such.execute-api.us-east-1.amazonaws.com/dev/user/{id}
