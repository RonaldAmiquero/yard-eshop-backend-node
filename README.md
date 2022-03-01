# Random Store API

This is a simple REST API developed using NodeJS, Express, PostgreSQL & Docker, designed with clean architecture.

## Features

- Sign up/sign in (Passport, JWT, bcrypt).
- Password reset mailer
- PostgreSQL & Docker
- DB Migrations
- REST API Request object validations
- CRUD Users, products, customers, categories & orders.

## Content

This proyect has one branche: main(contains the main project files)

## Installation

To install and run this proyect just type and execute:

- `git clone https://github.com/RonaldAmiquero/yard-eshop-backend-node.git`
- `cd yard-eshop-backend-node`
- `npm install`
- Rename `.env.example` to `.env`. In this file the `DATABASE_URL` needs to be updated according to your credentials `postgres://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:<DB_PORT>/<DB_NAME>`.
- `npm run dev` - This will start the application in development mode and run on port 3000

## Folder Structure

```
src
└───index.js          # Application entry point
└───routes            # Application routes / endpoints
└───services          # Express route services for all the endpoints of the app
└───config            # Environment variables config
└───db                # DB related files like models & migrations
└───libs              # DB connection
└───handlers          # Common logic
└───schemas           # Application Joi schemas
└───middlewares       # Express Middlewares & handlers
└───utils             # Passport strategies

```

**Life is simple make decisions and don't turn back!**

### Notes

- Requires [Docker](https://www.docker.com) installed.
