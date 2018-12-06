const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guest');

router.get('/guest', guestController.getGuest); 

module.exports = router;