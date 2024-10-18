## Description

This is the backend part of the Buena website. 

The main technology is:
- [NestJS](https://nestjs.com/)
- [Neon Postgres Database](https://console.neon.tech/)
- [Prisma](https://www.prisma.io/)

## Local setup

It is possible to run the backend separatly from the frontend by following the next steps.

```bash
$ npm install
$ npm run build
$ npm run start
```
Example of request for test: GET http://localhost:4000/api/users

## Unit tests

To run the tests, run the following command in the frontend or backend folder:

```bash
$ npm run test
```

## Deployment 

WIP - The backend is deployed on AWS Elastic Beanstalk.