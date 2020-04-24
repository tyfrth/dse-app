# DSE-App

Simple node app to display Auth0 clients and associated rules

## App Demo!
![](/images/dse-recording.gif)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Node 
```

### Installing

Once you've successfully cloned the repo, you'll need to install all the dependencies. 

You can do that by running the following in your `app/` directory:

```
npm install
```

Next, you'll need to create a`.env` file - There's an existing `.env-sample` available for you to copy:

```
cp .env-sample .env
```
The `ISSUER_BASE_URL` and `CLIENT_ID` can be found in the Settings of the new app you've created in your Auth0 dashboard - **Domain** and **Client ID**, respectively. The `APP_SESSION_SECRET` just needs to be a long random string. For testing purposes, you can obtain an `API_KEY` from the **Management API Test** tab:

![](/images/https://github.com/tyfrth/dse-app/blob/master/images/screenshot.PNG)

## Deployment

Once you've successfully cloned the repository, installed all the necessary dependecies and configured your `.env`, run `npm start` to start your server!

## Built With

* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [EJS](https://ejs.co/)

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
