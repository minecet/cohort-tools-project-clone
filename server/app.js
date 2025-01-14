const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

// app.js

// ...

const Cohort = require("./models/Cohort.model");
const Student = require("./models/Student.model");

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

/* cohorts json route */

//importing the json
//const cohorts = require("./cohorts.json")

//doing the route
//app.get("/api/cohorts", (request, response) => {
//  response.json(cohorts)
//})
app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
    
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({ error: "Failed to retrieve cohorts" });
    });
});

/* students json route */

//importing the json
//const students = require("./students.json")

//doing the route
//app.get("/api/students", (request, response) => {
//  response.json(students)
//})
//  GET  /students - Retrieve all books from the database
app.get("/api/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students);
    
      res.status(200).json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});






// START SERVER
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/cohort-tools-api"
  )
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    app.listen(3001, () => console.log('My first app listening on port http://localhost:3001'))
  })
  .catch(err => console.error('Error connecting to mongo', err))