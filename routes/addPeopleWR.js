const router = require('express').Router()
const peopleController = require('../controllers/peopleControllers')

router.post('/', peopleController.addPeopleWithRelation)

module.export = router;