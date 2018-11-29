const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food');

router.get('/food'); 

module.exports = router;