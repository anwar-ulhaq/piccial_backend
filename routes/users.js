const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const isAuth = require('../controllers/is-auth');

const multer = require('multer');

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/avatar');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
    //cb(null, req.session.user.userId + '-' + req.session.user.username + '-' + new Date().toISOString() + '-' + file.originalname);
  }
});

const avatarFilter = (req, file, cb) => {
  if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//multer

const uploadAvatar = multer({ storage: avatarStorage, fileFilter: avatarFilter }).single('avatar');


router.get('/signup', userController.getSignup);

router.post('/signup', userController.postSignup);

router.post('/login', userController.postLogin);

router.get('/logout', userController.getLogout);

router.get('/user-info-update', isAuth, userController.getUserInfoUpdate);

router.post('/user-info-update', isAuth, uploadAvatar, userController.postUserInfoUpdate);

router.get('/', userController.getIndex);

module.exports = router;