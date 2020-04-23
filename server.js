require('dotenv').config();
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const {auth} = require('express-openid-connect');
const path = require("path");
const fetch = require("node-fetch");

const appUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT}`;

const app = express();
app.set('view engine', 'ejs');
app.use(morgan('combined'));

app.use(auth({
  auth0Logout: true,
  baseURL: appUrl
}));

app.get('/', (req, res) => {
  res.render('home',  { user: req.openid && req.openid.user, applications: leftover_rules_apps_array });
});

// app.get('/expenses', (req, res) => {
//   res.render('expenses', {
//     expenses: [
//       {
//         date: new Date(),
//         description: 'Coffee for a Coding Dojo session.',
//         value: 42,
//       }
//     ]
//   });
// });

var rulesUrl = "https://dev-pxhmaog0.auth0.com/api/v2/rules"
var clientsUrl = "https://dev-pxhmaog0.auth0.com/api/v2/clients"

//apps_array = new Array;
leftover_rules_apps_array = new Array;
//universal_rules_array = new Array;

var headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${process.env.API_KEY}`}

fetch(clientsUrl, { method: 'GET', headers: headers})
  .then((res) => {
     return res.json()
})
  .then((json) => {
  json.forEach(function(object){
    //get rid of "All Applications in response"
    if (object.name != "All Applications") {
      let obj = {};
      obj.name = object.name;
      obj.client_id = object.client_id;
      obj.rules = [];
      leftover_rules_apps_array.push(obj);
  }
      //return leftover_rules_apps_array;
  // // console.log(`application name is ${object.name} and client_id is ${object.client_id}`);
  });
  //****
  fetch(rulesUrl, { method: 'GET', headers: headers})
  .then((res) => {
     return res.json()
})
  .then((json) => {

    json.forEach(function (object){
      if (object.script.includes("clientName" || "clientID")) {
        var splitScript = object.script.split(' ');
        var placeholder = splitScript.indexOf('client_id') + 2
        var client_id = splitScript[placeholder];
          client_id = client_id.replace(/[^\w\s]/gi, '')
          client_id = strip(client_id)
      
          for(var i = 0; i < leftover_rules_apps_array.length; i++) {
              if(client_id == leftover_rules_apps_array[i].client_id) {
                leftover_rules_apps_array[i].rules.push(object.name);
              } 
            }
          } else {
            for (var i = 0; i < leftover_rules_apps_array.length; i++) {
              leftover_rules_apps_array[i].rules.push(object.name);
            }
          }
      });
       console.log(leftover_rules_apps_array);
    });
 });
 
  function strip(s) {
      return s.split('').filter(function (x) {
          var n = x.charCodeAt(0);

          return 31 < n && 127 > n;
      }).join('');
      return(s)
  }

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`listening on ${appUrl}`);
});