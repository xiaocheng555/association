const express = require('express');
const router = express.Router();
const { student, login } = require('../controllers/student')

/* GET home page. */
router.get('/', student);
router.post('/login', login);

module.exports = router;
