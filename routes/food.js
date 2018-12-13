const express = require("express");
const router = express.Router();
const foodController = require("../controllers/food");
const isAuth = require("../controllers/is-auth");
const sharp = require("sharp");
const multer = require("multer");

//Declare folder and image files name when user upload food images
const foodStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/food-img");
  },
  filename: (req, file, cb) => {
    cb(
        null,
        req.session.user.userId +
        "-" +
        req.session.user.username +
        "-" +
        new Date().toISOString() +
        "-" +
        file.originalname
    );
  }
});

//Only image file: .png, .jpg, .jpeg can upload
const foodFilter = (req, file, cb) => {
  if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//multer

const uploadFoodImg = multer({
  storage: foodStorage,
  fileFilter: foodFilter
}).any();
//}).array("img-foods");

//This midleware resize multi images
const resizeImg = (req, res, next) => {
  let query = req.body;
  if (!req.body && !req.files) {
    res.json({ success: false });
  } else {
    console.log(req.files);

    for (let i = 0; i < req.files.length; i++) {
      sharp(req.files[i].path)
      .resize(900)
      .toFile(
          "./public/food-img/" + "resized-" + req.files[i].filename,
          function(err) {
            if (err) {
              console.error("sharp>>>", err);
            }
          }
      );
    }
  }
  next();
};

router.post('/add-food',isAuth,uploadFoodImg,resizeImg);

router.post("/add-food",isAuth,foodController.postAddFood);

router.get("/food-detail", isAuth, foodController.getFoodDetail);

router.post("/food-detail", isAuth, foodController.postComment);

router.get("/food-like", isAuth, foodController.getLike);

module.exports = router;
