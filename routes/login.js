const express = require('express');
const loginController = require('../controllers/loginController')
const router = express.Router();
var passport = require('passport');
require("../passport")(passport);


router.post('/', loginController.login);

router.get("/",(req, res)=>res.render("index/login"));

router.get("/logout", (req, res)=> res.render("index/login"));

router.get("/logout", (req, res)=> {
  req.logout();
  res.redirect("/");
});

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get("/auth/google", passport.authenticate("google"));

router.get("/auth/facebook/callback", passport.authenticate("facebook",{
  successRedirect:"/integrantes/", failureRedirect:"/"
}));

router.get("/auth/google/callback", passport.authenticate("google",{
  successRedirect:"/integrantes/", failureRedirect:"/"
}));


module.exports = router;
