const router = require('express').Router();
const testController = require('../controllers/testController');

router.get('/', testController.testPost)

module.exports = router;