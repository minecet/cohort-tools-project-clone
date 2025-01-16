const Student = require("../models/Student.model");
const mongoose = require('mongoose')

const router = require('express').Router()


/* students ROUTES */


//  GET  /students - Retrieve all students from the database
router.get("/", (req, res, next) => {
    Student.find({})
        .populate("cohort")
        .then((students) => {
            console.log("Retrieved students ->", students);

            res.status(200).json(students);
        })
        .catch((error) => {
            console.error("Error while retrieving students ->", error);
            next(error);
        });
});

//GET /api/students/:studentId - Retrieves a specific student by id
router.get("/:studentId", async (request, response, next) => {
    const { studentId } = request.params
    if (mongoose.isValidObjectId(studentId)) {
        try {
            const oneStudent = await Student.findById(studentId)
                .populate("cohort")
            response.status(200).json(oneStudent)
        } catch (error) {
            console.log(error);
            next(error);
        }
    } else {
        response.status(400).json({ message: 'Invalid Id' })
    }
})

//POST /api/students - Creates a new student

router.post("/", (req, res, next) => {
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
            next(error);
        });
});

//PUT /api/students/:studentId - Updates a specific student by id

router.put("/:studentId", async (request, response, next) => {

    const { studentId } = request.params
    
if (mongoose.isValidObjectId(studentId)) {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(studentId, request.body, {
            new: true,
            runValidators: true,
        })
        response.status(200).json(updatedStudent)
    } catch (error) {
        console.log(error);
        next(error);
    }
} else {
    response.status(400).json({ message: 'invalid id' })
}
    
})


//GET /api/students/cohort/:cohortId - Retrieves all of the students for a given cohort
router.get("/cohort/:cohortId", async (request, response, next) => {
    const { cohortId } = request.params;

    if (mongoose.isValidObjectId(cohortId)) {
        try {
            const cohortStudents = await Student.find({ cohort: cohortId }).populate("cohort");

            response.status(200).json(cohortStudents);
        } catch (error) {
            console.log(error);
            next(error);
        }
    } else {
        response.status(400).json({ message: 'Invalid Id' });
    }
});


//DELETE /api/students/:studentId
router.delete("/:studentId", async (request, response, next) => {
    const { studentId } = request.params
    if (mongoose.isValidObjectId(studentId)) {
        try {
            await Student.findByIdAndDelete(studentId)
            response.status(204).json()
        } catch (error) {
            console.log(error);
            next(error);
        }
    } else {
        response.status(400).json({ message: 'Invalid Id' })
    }
})


module.exports = router