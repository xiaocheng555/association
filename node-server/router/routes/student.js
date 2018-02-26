const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/student').student

/* GET home page. */
router.get('/', studentController);

module.exports = router;
