const router = require('express').Router()

// All the routes in there starts with "/api", see app.js to see how the router is imported and used

router.get('/', (req, res) => {
    res.json('All good in here')
})

const studentsRoutes = require('./students.routes')
router.use('/students', studentsRoutes)


const cohortsRoutes = require('./cohorts.routes')
router.use('/cohorts', cohortsRoutes)

module.exports = router