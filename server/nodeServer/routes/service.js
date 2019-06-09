'use strict';

// Load dependencies
const express = require('express');
const app = express();
var router = express.Router();

var JsonDB = require('node-json-db');
var db = new JsonDB("db/db.json", true, false);


// Import the required dependencies
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());




var port = process.env.PORT || 8080;
// We are going to implement a JWT middleware that will ensure the validity of our token. We'll require each protected route to have a valid access_token sent in the Authorization header
  var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: ''
  }),
  audience: 'http://localhost:3000',
  issuer: '',
  algorithms: 
  });

app.use(jwtCheck);



// Public route
router.get('/api/deals/public', (req, res)=>{
 var public_deals = db.getData('/publicdeals');
    if(!public_deals){
        res.send('No data found records');
    }
  res.json(public_deals);
})

// Private route
router.get('/api/deals/private',jwtCheck, (req,res)=>{
 var private_deals = db.getData('/privatedeals');
 if(!private_deals){
    res.send('No data founds');
 }
  res.json(private_deals);
})

module.exports = router;
