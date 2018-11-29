const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

router.get('/main', mainController.getMain);

module.exports = router;