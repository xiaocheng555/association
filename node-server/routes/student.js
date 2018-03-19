const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student')

/* GET home page. */
router.get('/', studentController.student);

module.exports = router;
