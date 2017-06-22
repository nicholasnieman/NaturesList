var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware"),
    geocoder   = require("geocoder");
    

//INDEX ROUTE
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            req.flash("error", "Something went wrong");
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

//NEW CAMPGROUND ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//CREATE CAMPGROUND ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newCampground = {name: name, image: image, description: desc, price: price, author: author, location: location, lat: lat, lng: lng };
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                req.flash("error", "Something went wrong");
            } else {
                req.flash("success", "New campground created");
                res.redirect("/campgrounds");
            }
        });
    });
});

//SHOW CAMPGROUND ROUTE
router.get("/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            req.flash("error", "Something went wrong");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Something went wrong");
            res.render("back");
        } else{
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedCampground){
            if(err){
                req.flash("error", err.message);
                res.redirect("back");
            } else {
                req.flash("success", "Campground updated");
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    }); 
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash("error", "Something went wrong");
           res.redirect("/campgrounds");
       } else {
           req.flash("success", "Campground deleted");
           res.redirect("/campgrounds");
       }
    });
});

module.exports = router;