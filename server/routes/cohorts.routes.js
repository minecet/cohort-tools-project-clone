const mongoose = require('mongoose')
const Cohort = require("../models/Cohort.model.js");

const router = require('express').Router()



router.post("/", (req, res) => {

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
        });
})
    ;



//GT /api/cohorts - Retrieves all of the cohorts in the database collection

router.get("/", (req, res) => {
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
router.get("/:cohortId", async (request, response) => {
    const { cohortId } = request.params
    if (mongoose.isValidObjectId(cohortId)) {
        try {
            const oneCohort = await Cohort.findById(cohortId)
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

router.put("/:cohortId", async (request, response) => {

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

router.delete("/:cohortId", async (request, response) => {
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





module.exports = router