require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

const API_KEY = process.env.API_KEY; // call to API key in env file

const cors = require("cors");

const { errors } = require("celebrate");

const errorHandler = require("./errors/error-handler");

const { requestLogger, errorLogger } = require("./errors/logger");

app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

const routes = require("./routes");

app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(routes); // regular routes

app.use(errorLogger);

app.use(errors()); // celebrate error handler

app.use(errorHandler); // general error handler


app.get("/api/radius", async(req, res) => {
  try{
    const { zip, radius } = req.body;

    //check that correct params came over from user input
    if(!zip || ! radius){
      return res.status(400).json({ message: "Missing required parameters"});
    };

    //need to convert the zip to the latitude & longitude to work with the api search params
    const zipToLatLong = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&postalCode=${zip}`);

    const findLatLong = await zipToLatLong.json();

    const lat = findLatLong.result.latLng.lat;
    const long = findLatLong.result.latLng.lng;
    
    //2nd api call to get the locations within the search radius
    const response = await fetch(`https://www.mapquestapi.com/search/v2/search?key=${API_KEY}&shapePoints=${lat},${long}&distance=${radius}&distanceUnit=m`);

    // jsoning final data from response to be readable on the frontend
    const finalData = await response.json();
    res.json(finalData);

  }catch(err){
      console.error(err);
      res.status(500).json({message: "Error hitting Mapquest API"});
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
