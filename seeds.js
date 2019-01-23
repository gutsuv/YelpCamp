var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Alpine Mountain", 
        image: "https://farm8.staticflickr.com/7095/7337936238_ae57ed5f48.jpg",
        description: "Blah blah blah this campground is so beautiful."
    },
    {
        name: "Steep Mountain", 
        image: "https://farm8.staticflickr.com/7453/10044256024_cf4798faa9.jpg",
        description: "Blah blah blah this campground is so beautiful."
    },
    {
        name: "Rocky River", 
        image: "https://farm9.staticflickr.com/8483/8232475175_6600740069.jpg",
        description: "Blah blah blah this campground is so beautiful."
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.deleteMany({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");
        // Comment.deleteMany({}, function(err) {
        //     if(err){
        //         console.log(err);
        //     }
        //     console.log("removed comments!");
        //      //add a few campgrounds
        //     data.forEach(function(seed){
        //         Campground.create(seed, function(err, campground){
        //             if(err){
        //                 console.log(err)
        //             } else {
        //                 console.log("added a campground");
        //                 //create a comment
        //                 Comment.create(
        //                     {
        //                         text: "This place is great, but I wish there was internet",
        //                         author: "Homer"
        //                     }, function(err, comment){
        //                         if(err){
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Created new comment");
        //                         }
        //                     });
        //             }
        //         });
        //     });
        // });
    }); 
    //add a few comments
}
 
module.exports = seedDB;