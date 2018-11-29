const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');

router.get('/users-manage', adminController.getUsersManage);

module.exports = router;