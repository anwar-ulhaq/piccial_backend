const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const isAuth = require('../controllers/is-auth');

router.get('/user-manager', isAuth, adminController.getUsersManage);

router.post('/user-delete',isAuth, adminController.postUserDelete);

router.post('/user-update-permission', isAuth, adminController.postUserUpdatePermission);

router.get('/admin', isAuth, adminController.getAdmin);

router.get('/food-detail-admin', isAuth, adminController.getFoodDetailAdmin);

router.post('/food-detail-admin', isAuth, adminController.postComment);

router.get('/food-like-admin', isAuth, adminController.getLike);

router.get('/delete-comment-admin', isAuth, adminController.getDeleteComment);

router.get('/delete-food-admin',isAuth, adminController.getDeleteFood);

router.get('/user-manager-search', isAuth, adminController.getUserManagerSearch);

router.get('/admin-search',isAuth, adminController.getAdminSearch);

module.exports = router;