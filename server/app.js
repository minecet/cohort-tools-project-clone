const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// app.js

// ...

//const Cohort = require("./models/Cohort.model");
//const Student = require("./models/Student.model");

// ...

const cookieParser = require("cookie-parser");
const PORT = 5005;

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Research Team - Set up CORS middleware here:
// ...
// Use the CORS middleware with options to allow requests
app.use(
  cors({
    // Add the URLs of allowed origins to this array
    origin: ['http://localhost:5173', 'http://example.com'],
  })
);
// from specific IP addresses and domains.


// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

/* Routes */

const indexRoutes = require('./routes/index.routes')
app.use('/api', indexRoutes)

// START SERVER
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/cohort-tools-api"
  )
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    app.listen(5173, () => console.log('My first app listening on port http://localhost:5173'))
  })
  .catch(err => console.error('Error connecting to mongo', err))