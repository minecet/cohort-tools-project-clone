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
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ->", students);
      res.status(200).json(students);
    }) 
    .catch((error) => {
      console.error("Error while retrieving students ->", error);
      res.status(500).json({ error: "Failed to retrieve students" });
    });
});

/* students ROUTES */

//POST /api/students - Creates a new student

app.post("/api/students", (req, res) => {
	Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    cohort: req.body.cohort,
    projects: req.body.projects
  })
  .then((createdStudent) => {
  	console.log("Student added ->", createdStudent);
  
    res.status(201).json(createdStudent);
  })
  .catch((error) => {
    console.error("Error while creating the student ->", error);
    res.status(500).json({ error: "Failed to create the student" });
  });
});

// ...



//GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
app.get("/api/students/cohort/:cohortId", async (request, response) => {
  const { cohortId } = request.params;
  

  if (mongoose.isValidObjectId(cohortId)) {
    try {
      const cohortStudents = await Student.find({ cohort: cohortId }).populate("cohort");
      response.status(200).json(cohortStudents);
    } catch (error) {
      console.log(error); 
      response.status(500).json(error); 
    }
  } else {
    response.status(400).json({ message: 'Invalid Id' }); 
  }
});

//GET /api/students/:studentId - Retrieves a specific student by id
app.get("/api/students/:studentId", async (request, response) => {

  
  const { studentId } = request.params
  if (mongoose.isValidObjectId(studentId)) {
      try {
          const oneStudent = await Student.findById(studentId)
          .populate("cohort")
          response.status(200).json(oneStudent)
      } catch (error) {
          console.log(error);
          response.status(500).json(error);
      }
  } else {
      response.status(400).json({ message: 'Invalid Id' })
  }
})


//PUT /api/students/:studentId - Updates a specific student by id

app.put("/api/students/:studentId", async (request, response) => {

  const { studentId } = request.params

  try {
      const updatedStudent = await Student.findByIdAndUpdate(studentId, request.body, {
          new: true,
          runValidators: true,
      })
      response.status(200).json(updatedStudent)
  } catch (error) {
      console.log(error);
      response.status(500).json(error)
  }
})

//DELETE /api/students/:studentId
app.delete("/api/students/:studentId", async (request, response) => {
  const { studentId } = request.params
  if (mongoose.isValidObjectId(studentId)) {
      try {
          await Student.findByIdAndDelete(studentId)
          response.status(204).json()
      } catch (error) {
          console.log(error);
          response.status(500).json(error);
      }
  } else {
      response.status(400).json({ message: 'Invalid Id' })
  }
})

/* Cohort ROUTES */
// POST /api/cohorts - Creates a new cohort

app.post("/api/cohorts", (req, res) => {
  
  Cohort.create({
  	cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.body.totalHours
  })
    .then((createdCohort) => {
        console.log("Cohort created -> ", createdCohort);
        res.status(201).json(createdCohort);
        })
    .catch((error) => {
      console.error("Error while creating the cohort ->", error);
      res.status(500).json({ error: "Failed to create the cohort" });
    });    })    
    ;  
   	


//GT /api/cohorts - Retrieves all of the cohorts in the database collection

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

// GET /api/cohorts/:cohortId - Retrieves a specific cohort by id
app.get("/api/cohorts/:cohortId", async (request, response) => {
  const { cohortId } = request.params
  if (mongoose.isValidObjectId(cohortId)) {
      try {
          const oneCohort = await Cohort.findById(cohortId)
         // .populate("cohort")
          response.status(200).json(oneCohort)
      } catch (error) {
          console.log(error);
          response.status(500).json(error);
      }
  } else {
      response.status(400).json({ message: 'Invalid Id' })
  }
})

// PUT /api/cohorts/:cohortId - Updates a specific cohort by id

app.put("/api/cohorts/:cohortId", async (request, response) => {

  const { cohortId } = request.params

  try {
      const updatedCohort = await Cohort.findByIdAndUpdate(cohortId, request.body, {
          new: true,
          runValidators: true,
      })
      response.status(200).json(updatedCohort)
  } catch (error) {
      console.log(error);
      response.status(500).json(error)
  }
})
// DELETE /api/cohorts/:cohortId - Deletes a specific cohort by id

app.delete("/api/cohorts/:cohortId", async (request, response) => {
  const { cohortId } = request.params
  if (mongoose.isValidObjectId(cohortId)) {
      try {
          await Cohort.findByIdAndDelete(cohortId)
          response.status(204).json()
      } catch (error) {
          console.log(error);
          response.status(500).json(error);
      }
  } else {
      response.status(400).json({ message: 'Invalid Id' })
  }
})


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