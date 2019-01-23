var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");

//Root Route
router.get("/", function(req, res) {
    res.render("landing");
});

// Register Form
router.get("/register", function(req, res) {
   res.render("register"); 
});

// Handle Register Form Logic
router.post("/register", function(req, res) {
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user) {
       if(err) {
           return res.render("register", {"error": err.message + "!"});
       } else {
           passport.authenticate("local")(req, res, function() {
               req.flash("success", "Successfully registered!");
               res.redirect("/campgrounds");
           });
       }
   });
});

// Login Form
router.get("/login", function(req, res) {
   res.render("login"); 
});

// Handle Login Form Logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login"
    }), function(req, res) {
});

// Logout Route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "Successfully logged out!");
   res.redirect("/campgrounds");
});

module.exports = router;