const mongoose = require('mongoose')
const consts = require('./consts')

const { MLAB_URL, DB_USER, DB_PASS } = consts

const options = {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    autoReconnect: true,
    user: DB_USER,
    pass: DB_PASS
}

mongoose.connect(MLAB_URL, options)
    .then(() => console.log('connected to DB'))
    .catch(err => console.log(`connection error: ${err}`))