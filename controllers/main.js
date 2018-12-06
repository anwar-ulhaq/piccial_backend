const Food = require("../models/foods");
exports.getMain = (req, res, next) => {
  Food.fetchAllFoodInMain()
  .then(result =>{
    console.log(result[0]);
    const foods = result[0];
    Food.getLikeSum(foods);
    res.render("main", {
      pageTitle: "Piccial - Food Reviews Page",
      path: "/main",
      user: req.session.user,
      foods: foods
    });
  })
  .catch(err => {
    console.log(err);
  });

};
