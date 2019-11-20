
require("dotenv").config();
const express = require('express');
const axios = require("axios");
const cors = require("cors");
const zipcodes = require("zipcodes");

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();
server.use(cors());

server.use(express.json());
server.use('/api/schemes', SchemeRouter);

server.post('/weather', (req, res) => {
  const api_key = process.env.WEATHER_API_KEY;
  const testURL = `https://api.darksky.net/forecast/${api_key}/${req.body.latitude},${req.body.longitude}`;
  const myInit = {
    method: "HEAD",
    mode: "no-cors"
  };

  const myRequest = new Request(testURL, myInit);

  fetch(myRequest)
    .then(function(response) {
      return response;
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(e) {
      console.log(e);
    });
  
  // console.log(process.env.WEATHER_API_KEY);
  //   const api_key = process.env.WEATHER_API_KEY;
  //     axios
  //       .get(
  //         `https://api.darksky.net/forecast/${api_key}/${req.body.latitude},${req.body.longitude}`
  //       )
  //         .then(response => {
  //           //console.log(zipcodes.lookup(90210));
  //         res.status(200).json(response.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
   
})

module.exports = server;