const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');
const isAuth = require('../controllers/is-auth');

router.get('/main', isAuth, mainController.getMain);

router.get('/main-search', isAuth, mainController.getMainSearch);

module.exports = router;