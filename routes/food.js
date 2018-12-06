const express = require('express');
const router = express.Router();
const foodController = require('../controllers/food');
const isAuth = require('../controllers/is-auth');

const multer = require('multer');

const foodStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/food-img');
  },
  filename: (req, file, cb) => {
    //cb(null, new Date().toISOString() + '-' + file.originalname);
    cb(null, req.session.user.userId + '-' + req.session.user.username + '-' + new Date().toISOString() + '-' + file.originalname);
  }
});

const foodFilter = (req, file, cb) => {
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

const uploadFoodImg = multer({ storage: foodStorage, fileFilter: foodFilter }).array('img-foods');

router.post('/add-food', isAuth, uploadFoodImg,foodController.postAddFood);

router.get('/food-detail', isAuth, foodController.getFoodDetail);

router.post('/food-detail', isAuth, foodController.postComment);

router.get('/food-like', isAuth, foodController.getLike);

module.exports = router;