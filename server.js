require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const {auth} = require('express-openid-connect');
const fetch = require("node-fetch");

//node stuff
const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('combined'));

//use auth0
app.use(auth({
  auth0Logout: true,
  baseURL: appUrl
}));

//only route
app.get('/', (req, res) => {
  res.render('home',  { user: req.openid && req.openid.user, applications: apps_array });
});

//urls to get rules and clients
var rulesUrl = "https://dev-pxhmaog0.auth0.com/api/v2/rules"
var clientsUrl = "https://dev-pxhmaog0.auth0.com/api/v2/clients"

//define array where we'll store application objects + client_id/rules
apps_array = new Array;

//headers for node-fetch requests 
var headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${process.env.API_KEY}`}

//get all the clients
fetch(clientsUrl, { method: 'GET', headers: headers})
  .then((res) => {
     return res.json()
})
  .then((json) => {
  //itereate through all json objects
  json.forEach(function(object){
    //get rid of "All Applications in response"
    if (object.name != "All Applications") {
      //creating objects and adding them to our apps_array
      let obj = {};
      obj.name = object.name;
      obj.client_id = object.client_id;
      obj.rules = [];
      apps_array.push(obj);
    }
  });
  //get all the rules
  fetch(rulesUrl, { method: 'GET', headers: headers})
  .then((res) => {
     return res.json()
})
  .then((json) => {
    //iterate through rules objects
    json.forEach(function (object){
      //check if script has clientName or clientID defined
      if (object.script.includes("clientName" || "clientID")) {
        //logic to pull client_id from script 
        var splitScript = object.script.split(' ');
        var placeholder = splitScript.indexOf('client_id') + 2
        var client_id = splitScript[placeholder];
          client_id = client_id.replace(/[^\w\s]/gi, '')
          client_id = strip(client_id)
          //compare client_id to apps_array client id / if match then add the associated rule to apps_array object
          for(var i = 0; i < apps_array.length; i++) {
              if(client_id == apps_array[i].client_id) {
                apps_array[i].rules.push(object.name);
              } 
            }
            //if no match then the rule is universal and can be added to all objects (apps) in apps_array
          } else {
            for (var i = 0; i < apps_array.length; i++) {
              apps_array[i].rules.push(object.name);
            }
          }
      });
       console.log(apps_array);
    });
 });
 
 //helper function to strip everything non essential from client_id value
  function strip(s) {
      return s.split('').filter(function (x) {
          var n = x.charCodeAt(0);

          return 31 < n && 127 > n;
      }).join('');
      return(s)
  }
//fire up server
http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});