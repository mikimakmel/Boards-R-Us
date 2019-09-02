const Snowboard = require('../models/snowboard')

module.exports = {

    // get all the snowboards from db.
    async getAllSnowboards(req, res) {
        console.log("getAllSnowboards()")

        const docs = await Snowboard.find({})

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },

    // get snowboard by ID.
    async getSnowboardByID(req, res) {
        console.log("getSnowboardByID()")

        snowboardID = req.params.id

        const docs = await Snowboard.find({ id: snowboardID })

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },

    async getSnowboardByName(req, res) {
        console.log("getSnowboardByName()")

        snowboardName = req.params.name


        const docs = await Snowboard.find({ $or:[{"name": { "$regex":snowboardName, "$options": "i" }} , {"brand": { "$regex":snowboardName, "$options": "i" }}]  } )

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },

    // get all the snowboards belongs to a spesific style from db.
    async getSnowboardByStyleAndGender(style, gender) {
        console.log("getSnowboardByStyleAndGender()")
    
        const docs = await Snowboard.find({ ridingStyle: style, gender: gender})
        
        if(docs) return docs
        else res.status(404).send("not found")
    },

    // adds a new Snowboard to db.
    async addNewSnowboard(req, res) {
        console.log("addNewSnowboard()")

        const newSnowboard = new Snowboard(req.body)
        var g_snowboardsCount = 100
        const dbCount = await Snowboard.find({}).countDocuments()       // returns the amount of snowboards in the collection
        g_snowboardsCount += dbCount                                    // generate uniq id 
        newSnowboard.id = g_snowboardsCount + 1

        const result = await newSnowboard.save()

        if (result) res.json(newSnowboard)
        else res.status(404).send("not found")
    }
    
}
