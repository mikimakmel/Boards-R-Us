const mongoose = require('mongoose')

const user_schema = new mongoose.Schema({

    id: { type: Number, index: 1, min: 200, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: false },
    gender: { type: String, required: false },
    ridingStyle: { type: String, required: false },                 // what kind of style the user tends to ride
    level: { type: Number, min: 1, max: 5, required: false },       // user's riding level (1 is the lowest, 5 is the highest)
    isSigned: { type: Boolean, default: false , required: false},   // if the user ever entered to our system
    hasProfile: { type: Boolean, default: false , required: false}, // if the user created a detailed profile about himself
    topPicks: { type: [Object], required: false },                  // array of top 5 snowboards that the system matched to each user
    dislikeList: { type: [Number], required: false },               // array of snowboards id's that the user mark as dislike
    bodyMeasures: { 
        weight: { type: Number, min: 30, max: 150, required: false },
        height: { type: Number, min: 30, max: 220, required: false },
        shoeSize: { type: Number, min: 30, max: 60, required: false }
    },
    

})

const user_model = mongoose.model('users', user_schema)
module.exports = user_model
