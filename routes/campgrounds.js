var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

// Index Route
router.get("/campgrounds", function(req, res) {
    var perPage = 6;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Campground.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allCampgrounds) {
        Campground.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("campgrounds/index", {
                    campgrounds: allCampgrounds,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});

// Create Campground Route
router.post("/campgrounds", middleware.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, price: price, image: image, description: desc, author: author};
    
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            req.flash("success", "Successfully created new campground!");
            res.redirect("/campgrounds");
        }
    });
});

// Create Campground Form
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// Show Campground Information
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err || !foundCampground) {
            req.flash("error", "Campground not found!");
            res.redirect("/back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// Edit Campground Form
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// Update Campground
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully updated campground information!");
            res.redirect("/campgrounds/" + req.params.id);
        } 
    });
});

// Destroy Campground
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findOneAndDelete(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Successfully deleted campground!");
            res.redirect("/campgrounds");
        } 
    });
});

module.exports = router;