const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../controllers/is-auth');

router.get('/user-manager', isAuth, adminController.getUsersManage);

router.post('/user-delete',isAuth, adminController.postUserDelete);

router.post('/user-update-permission', isAuth, adminController.postUserUpdatePermission);

router.get('/admin', isAuth, adminController.getAdmin);

module.exports = router;