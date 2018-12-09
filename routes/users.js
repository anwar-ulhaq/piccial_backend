const express = require('express');
const sharp = require('sharp');

const router = express.Router();
const userController = require('../controllers/users');
const isAuth = require('../controllers/is-auth');
const gm = require('gm');

const multer = require('multer');

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/avatar');
  },
  filename: (req, file, cb) => {
    console.log('printing file : '+ JSON.stringify(file));
    //Result
    //printing file : {"fieldname":"avatar","originalname":"Safeway_Signature_Cafe_corn_chowder.jpg","encoding":"7bit","mimetype":"image/jpeg"}
    cb(null, new Date().toISOString() + '-' + file.originalname);
    //cb(null, req.session.user.userId + '-' + req.session.user.username + '-' + new Date().toISOString() + '-' + file.originalname);
  }
});

const cropAvatar = (req, res, next) => {
  const avataUrl = req.file.filename;
  const imagePath = './public/avatar/'+req.file.filename;
  const outputImagePath = './public/avatar/crop/' + req.file.filename;
  sharp(imagePath)
  .resize(400, 400)
  .toFile(outputImagePath);
  next();
};

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

router.post('/user-info-update', isAuth, uploadAvatar, cropAvatar, userController.postUserInfoUpdate);

router.post('/user-password-update', isAuth, userController.postUserPasswordUpdate);

router.get('/', userController.getIndex);

module.exports = router;