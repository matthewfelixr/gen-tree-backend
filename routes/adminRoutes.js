const router = require('express').Router()
const adminController = require('../controllers/adminController')
const peopleController = require('../controllers/peopleControllers')

router.post('/', adminController.loginAdmin)

module.exports = router;