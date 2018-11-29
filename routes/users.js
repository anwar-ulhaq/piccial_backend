const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.post('/login', userController.postLogin);

router.get('/', userController.getIndex);

module.exports = router;