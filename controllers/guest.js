const User = require("../models/users");
const Food = require('../models/foods');
const dateFormat = require('./dateFormat');
exports.getGuest = (req, res, next) => {
  //console.log('signup');
  User.guest()
    .then(result => {
      /* res.render("guest", {
            pageTitle: "Welcome to Piccial",
            path: "/guest"
          }); */
      Food.fetchAllFoodInMain()
        .then(result => {
          //console.log('rrr',result[0]);
          const foods = result[0];
          //console.log('hhhhh',foods);
          res.render("guest", {
            pageTitle: "Piccial - Food Reviews Page",
            path: "/guest",
            user: req.session.user,
            foods: foods,
            foodOfTheDay: foods
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getGuestSearch = (req, res, next) => {
  const search = req.query.search;
  //console.log(search);
  Food.foodOfTheDay().then(result =>{
    //console.log(result[0]);
    const foodOfTheDay = result[0];
    Food.search(search)
    .then(result =>{
      const foods = result[0];
      Food.getLikeSum(foods);
      res.render("guest", {
        pageTitle: "Piccial - Food Reviews Page",
        path: "/guest",
        user: req.session.user,
        foods: foods,
        foodOfTheDay : foodOfTheDay
      });
    }) 
    .catch(err => {
      console.log(err); 
    });
  }).catch(err =>{
    console.log(err);
  });
  
};

exports.getFoodDetailGuest = (req, res, next) => {
  const foodId = req.query.foodId;
  //console.log(foodId);
  Food.getFoodDetailGuest(foodId).then(result =>{
    //console.log('vtt',result[0][0]);
    const food = result[0]
    Food.getComments(foodId).then(cm =>{
      const comment = cm[0];
      //console.log(comment);
      Food.findImagesByFoodId(foodId).then(images =>{
        const image = images[0];
        console.log(image);
        const date = dateFormat.dateFormat(food[0].timeUpdate)
        res.render("food-detail-guest", {
          pageTitle: "Food detail",
          path: "/food-detail-guest",
          comment: comment,
          food: food,
          date: date,
          image:image
        });
      }).catch(err =>{
        console.log(err);
      });
      
    }).catch(err =>{
      console.log(err);
    });
  }).catch(err =>{
    console.log(err);
  })
};