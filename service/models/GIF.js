const mongoose = require('mongoose')

const GIF_schema = new mongoose.Schema({

    id: { type: Number, index: 1, min: 300, required: true },
    userID: { type: Number, required: true },                       // id of the user that uploaded this GIF.
    fileSource: { type: String, required: true },                   // GIF source brought from third part.
    date: { type: Date, required: true },                           // date of filming (for weather API).
    rank: { type : Number, required: false},                        // the system ranks each GIF using weather parameters.
    weather: {                                                      // info brought from third part weather API.
        temperature: { type: Number, required: true },
        icon: { type: String, required: true },                     // rain/snow/sunny etc.
        windSpeed: { type: Number, min: 0, required: true }
    }

})

const GIF_model = mongoose.model('gifs', GIF_schema)
module.exports = GIF_model
