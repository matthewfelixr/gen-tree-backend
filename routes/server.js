const router = require('express').Router()

// Router imports go here
const peopleRoutes = require('./peopleRoutes');
const testRoutes = require('./testRoutes');
const adminRoutes = require('./adminRoutes')

router.use('/people', peopleRoutes)
router.use('/test', testRoutes)
router.use('/admin',adminRoutes)

module.exports = router