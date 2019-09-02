const mongoose = require('mongoose')

const snowBoard_schema = new mongoose.Schema({

    id: { type: Number, index: 1, min: 100, required: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: false },
    ridingStyle: { type: String, required: true },                      // what kind of style the snowboard meant to.
    imageSource: { type: String, required: true},                       // image source brought from third part.
    recommendedLvl: { type: Number,  min: 1, max: 5, required: true },  // to match the user's riding level (1 is the lowest, 5 is the highest).
    measures: { 
        length: { type: Number, min: 100, max: 180, required: true },
        width: { type: Number, min: 20, max: 30, required: true }
    }

})

const snowBoard_model = mongoose.model('snowboards', snowBoard_schema)
module.exports = snowBoard_model
