var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    data = [
        {
            name: "Cloud's Rest",
            image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Silver Valley",
            image: "https://farm4.staticflickr.com/3805/9667057875_90f0a0d00a.jpg",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Paradise Port",
            image: "https://farm8.staticflickr.com/7457/9586944536_9c61259490.jpg",
            description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ];

function seedDB(){
    
    //REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }
        // console.log("removed campgrounds!");   
        
        // //ADD NEW CAMPGROUNDS
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log("added a campground");
        //             //CREATE A COMMENT
        //             Comment.create({
        //                 text: "This place is great, but I wish there was internet!",
        //                 author: "Homer"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("created new comment");
        //                 }
        //             });
        //         } 
        //     });
        // });
    });
}    

module.exports = seedDB;