const router = require('express').Router()
const peopleController = require('../controllers/peopleControllers')
const { adminAuth } = require('../middleware/auth')

router.get('/', peopleController.getPeople)
router.get('/:id', peopleController.getOnePeople)
router.post('/findRel', peopleController.getOnePeopleRelations)

// Admin Only

router.post('/',adminAuth,peopleController.addPeople)
router.post('/addWithRelation', adminAuth,peopleController.addPeopleWithRelation)
router.post('/addDeathDate', adminAuth,peopleController.updatePeopleDeathStatus)
router.put('/updateBiodata', adminAuth,peopleController.updatePeopleBiodata)

module.exports = router;