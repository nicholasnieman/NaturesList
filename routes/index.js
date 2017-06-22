var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

//ROOT ROUTE
router.get("/", function(req, res){
   res.render("landing")});

//NEW USER ROUTE
router.get("/register", function(req, res){
    res.render("register");
});

//CREATE USER ROUTE
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to Nature's List, " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//SHOW LOGIN ROUTE
router.get("/login", function(req, res){
    res.render("login");    
});

//LOGIN LOGIC ROUTE
router.post("/login", passport.authenticate("local",
    {   
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome to Nature's List"
    }), function(req, res){
});

//LOGOUT LOGIC ROUTE
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "You have logged out");
    res.redirect("/campgrounds");
});

module.exports = router;