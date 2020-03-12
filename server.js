const express = require("express");
const helmet = require("helmet");
const cors = require("cors");



const axios = require("axios");


const SchemeRouter = require("./schemes/scheme-router.js");

const server = express();
server.use(cors());
server.use(helmet());
server.use(express.json());
server.use("/api/schemes", SchemeRouter);

server.get("/", (req, res) => {
  res.json({ message: "WELCOME TO Weather" });
});
server.post("/weather", (req, res) => {
  // const api_key =
  //   process.env.WEATHER_API_KEY;
  // const testURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${api_key}/${req.body.latitude},${req.body.longitude}`;
  // const myInit = {
  //   method: "HEAD",
  //   mode: "no-cors"
  // };

  // const myRequest = new Request(
  //   testURL,
  //   myInit
  // );

  // fetch(myRequest)
  //   .then(function(response) {
  //     return response;
  //   })
  //   .then(function(response) {
  //     console.log(response);
  //   })
  //   .catch(function(e) {
  //     console.log(e);
  //   });

  const api_key = process.env.WEATHER_API_KEY;
  axios
    .get(
      `https://api.darksky.net/forecast/${api_key}/${req.body.latitude},${req.body.longitude}`
    )
    .then(response => {
      //console.log(zipcodes.lookup(90210));
      res.status(200).json(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = server;
