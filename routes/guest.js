const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guest');

router.get('/guest', guestController.getGuest); 

router.get('/guest-search', guestController.getGuestSearch);

router.get('/food-detail-guest', guestController.getFoodDetailGuest);

module.exports = router;