//require('dotenv').config()
const mongoose = require('mongoose')
const db = mongoose.connection

//const mongoURI = 'mongodb://127.0.0.1:27017/imbibed'
const MONGODB_URI = process.env.MONGODB_URI

//mongoose.connect(mongoURI, {
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(
    () => {
        console.log('The connection with mongod is established')
    }).catch((error) => {
        console.log(error)
    })



    db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
    db.on('connected', () => console.log('mongo connected: ', MONGODB_URI))
    db.on('disconnected', () => console.log('mongo disconnected'))

    module.exports = mongoose