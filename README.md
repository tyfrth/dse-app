# DSE-App

Simple node app to display Auth0 clients and associated rules

## App Demo!
![](/images/dse-recording1.gif)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

```
Node.js 
```
Install for your platform [here](https://nodejs.org/en/download/). The package manager `npm` is included with the installation of Node.js.

### Installing

Once you've successfully cloned the repo, you'll need to install all the dependencies. 

You can do that by running `npm install` in your `app/` directory:

### Configuration

In your application Settings in the Auth0 dashboard, add `http://localhost:3000/callback` to **Allowed Callback Urls** as well as `http://localhost:3000` to **Allowed Logout Urls**

Next, you'll need to create a`.env` file in your `app` directory - There's an existing `.env-sample` available for you to copy:

```
cp .env-sample .env
```
The `ISSUER_BASE_URL` and `CLIENT_ID` can be found in the Settings of the new app you've created in your Auth0 dashboard - **Domain** and **Client ID**, respectively. The `APP_SESSION_SECRET` just needs to be a long random string. For testing purposes, you can obtain an `API_KEY` from the **Management API Test** tab:

![](/images/screenshot.PNG)

Be sure to set the **rulesUrl** and **clientsUrl** in **server.js** to reflect your Auth0 tenant.

![](/images/urls.PNG)

## Deployment

Once you've successfully cloned the repository, installed all the necessary dependecies and configured your `.env`, run `npm start` to start your server!

## Built With

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [EJS](https://ejs.co/)

**If you run into any issues with configuring your app, the following lab may be of use: https://auth0.com/docs/identity-labs/01-web-sign-in**
