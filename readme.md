# Full-Stack JWT-Authenticated Application

![Image](https://github.com/MMMorpheus/jwt-auth/tree/master/jwt-auth.png)

## Introduction

Welcome to my Full-Stack JWT-Authenticated Application! This application provides a robust authentication system using JSON Web Tokens (JWT) across both the front and back ends, ensuring secure user access and data integrity.

## Overview

The application leverages the power of JWT to authenticate users and authorize access to various resources within the system. JWT is a widely adopted standard for securing web applications and APIs, providing a stateless authentication mechanism that is both secure and scalable.

## Tech-stack:

**Backend**:

- Node.js
- Express
- PostgresQL
- Prisma

**Frontend**:

- React
- Vite
- axios

It's fully typed, uses neither any style engine or library nor any state manager, just logic, so feel free to use it (or not) as basis to your future apps.
For better UX I set up interceptors on failed responses to perform a refresh token action.

> NOTE:
>
> > For convenience, access token stores in a local storage, as well as user data not to perform the refresh action on every page reload. If your app dealing with sensitive data, you should use better security approaches.

## Project description

For your convenience I'd like to describe main scenarios of use to understand what does this app do.

### Login

1. User enter his credentials into a form.
1. Before submiting the data, client-side validation process is triggered;
1. Successfully validated data is sent to the server.
1. Before working with user data, server-side validation is triggered.
1. Successfully validated data is compared with a record in a DB to find match.
1. If there were no errors, then token service generate token's pair - access token and refresh token correspondingly.
1. Based upon a refresh token, service creates a refresh session into a DB for further checks.
1. Server sets refresh cookie and sends user data with a token.

### Register

Just the same as register, except that moment, that at some time server creates a new user record in a DB;

### Access to a protected resource

1. Client send a request with an authorization header.
2. Server checks authorization token on it's validity and lifetime.
   2.1 If there were no errors, server sends user requested resource
   2.2 If they were, the request is rejected until the new pair of valid tokens will be received

## Near future plans

- cover it with various tests;
- wrap the whole app into a docker;

## Getting Started

To get started with app, follow these steps:

- Clone the Repository
- Install Dependencies
- Configure Environment Variables
- Run the Application: Start both the frontend and backend servers by running appropriate commands (e.g., npx vite for the frontend, and npm run start for the backend).

## Contributing

Welcome contributions from the community to improve and extend it. If you'd like to contribute, please follow these guidelines:

- Fork the repository and create a new branch for your feature or bug fix.
- Submit a pull request with a detailed description of your changes.
