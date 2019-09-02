const User = require('../models/user')
const snowboardCtl = require('./snowboards.ctl')

module.exports = {

    // get all the signed users from db. (users that have entered our system at least once using gmail)
    async getAllSignedUsers(req, res) {
        console.log("getAllSignedUsers()")

        const docs = await User.find({})

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },

    // checks if a specific user is already signed to our system, if true then return his details.
    async checkIfUserIsSigned(req, res) {
        console.log("checkIfUserIsSigned()")

        const userID = req.body.id
        const docs = await User.find({ id: userID })

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },
    async getUserByid(req, res) {
        console.log("checkIfUserIsSigned()")

        const userID = req.params.id
        const docs = await User.find({ id: userID })

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },
    async getUserByEmail(req, res) {
        console.log("get user by email()")

        const userEmail = req.params.email
        const docs = await User.find({ email: userEmail })

        if (docs) res.json(docs)
        else res.status(404).send("not found")
    },

    // adds a new user to db after gmail authentication
    async addNewUser(req, res) {
        console.log("addNewUser()")

        const newUser = new User(req.body)  
        newUser.isSigned = true

        var g_usersCount = 200
        const dbCount = await User.find({}).countDocuments()        // returns the amount of snowboards in the collection
        g_usersCount += dbCount                                     // generate uniq id 
        newUser.id = g_usersCount + 1

        const result = await newUser.save()

        if (result) res.json(newUser)
        else res.status(404).send("not found")
    },

    // update the profile details of an existing user
    async updateUserProfile(req, res) {
        console.log("updateUserProfile()")

        // user attributes
        var userID = req.body.id
        var newName = req.body.name
        var newGender = req.body.gender
        var newLevel = req.body.level
        var newAddress = req.body.address
        var newRidingStyle = req.body.ridingStyle
        var newWeight = req.body.weight
        var newHeight = req.body.height
        var newShoeSize = req.body.shoeSize
        var newDislikeList = req.body.dislikeList

        var topPicks = []
        var topPicksCount = 0
      
        snowboardCtl.getSnowboardByStyleAndGender(newRidingStyle, newGender) // returns all the snowboards belongs to a spesific style.
        .then(async (docs) => {
            // creating a top picks list for the user
            for (var i = 0; i < docs.length; i++) {
                if (newDislikeList.length > 0) {
                    var isInList = false
                    // going thru the disliked snowboards list to make sure we won't put it in the top picks list.
                    for (var j = 0; j < newDislikeList.length; j++) {
                        if (docs[i].id == newDislikeList[j]) {
                            isInList = true // found in dislikes list
                            break
                        }
                    }
                    if (isInList == false && topPicksCount < 5) {
                        topPicks.push(docs[i])
                        topPicksCount++
                    }
                } 
                else if (topPicksCount < 5) {
                    topPicks.push(docs[i]) 
                    topPicksCount++ 
                }
            }

            const result = await User.updateOne(
                { id: userID },
                { 
                    $set: {
                        name: newName,
                        gender: newGender,
                        address: newAddress,
                        ridingStyle: newRidingStyle,
                        level: newLevel,
                        hasProfile: true,
                        topPicks: topPicks,
                        bodyMeasures: {
                            weight: newWeight,
                            height: newHeight,
                            shoeSize: newShoeSize
                        }
                    }
                }
            )

            const updatedUser = await User.findOne({ id: userID })

            if (result) res.json(updatedUser)
            else res.status(404).send("not found")
        })
    },

    // update the user's dislike list to learn what kind of snowboards he doesn't like and returns a new top list 
    async markDislikeSnowboard(req, res) {
        console.log("markDislikeSnowboard()")

        var snowboardID = req.body.snowboardID
        var userID = req.body.userID
        var userGender = req.body.userGender
        var newRidingStyle = req.body.ridingStyle
        var newDislikeList = req.body.dislikeList

        var newTopPicks = []
        var topPicksCount = 0
        var idIsInList = false

        // checks if the snowboard is in dislike list
        for (var i = 0; i < newDislikeList.length; i++) {
            if (snowboardID == newDislikeList[i]) {
                idIsInList = true
                break;
            }
        }

        // if the snowboard is not in dislike list
        if(!idIsInList) {
            snowboardCtl.getSnowboardByStyleAndGender(newRidingStyle, userGender)
            .then(async (styleDocs) => {
                console.log(styleDocs)
                var isShowInList = false
                // creating a new top picks list for the user that doesn't contain disliked snowboard
                for (var i = 0; i < styleDocs.length; i++) {
                    if(newDislikeList.length > 0 ){
                        isShowInList = false
                        for (var j = 0; j < newDislikeList.length; j++) {
                            if (styleDocs[i].id == newDislikeList[j]) {
                                isShowInList = true
                                break;
                            }
                        }
                        if (styleDocs[i].id != snowboardID && topPicksCount < 5 && !isShowInList) {
                            newTopPicks.push(styleDocs[i])
                            topPicksCount++
                        }
                    } else {
                        if (styleDocs[i].id != snowboardID && topPicksCount < 5) {
                            newTopPicks.push(styleDocs[i])
                            topPicksCount++
                        }
                    }
                 
                    
                }

                const result = await User.updateOne(
                    { id: userID },
                    {
                        $set: { topPicks: newTopPicks },
                        $push: { dislikeList: snowboardID }
                    }
                )
        
                const updatedUser = await User.findOne({ id: userID })
        
                if (result) {
                    res.json(updatedUser)
                }
                else res.status(404).send("not found")
            })
        } 
        else {
            const updatedUser = await User.findOne({id: userID})
        
            if (updatedUser) res.json(updatedUser)
            else res.status(404).send("not found")
        }
    },

}
