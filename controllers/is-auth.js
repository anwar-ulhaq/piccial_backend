//If user is not loged in, return to index (login form)
module.exports = (req,res,next) =>{
  if(!req.session.isLoggedIn){
    return res.redirect('/');
  }
  next();
};