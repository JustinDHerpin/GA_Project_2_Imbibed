require('dotenv').config()
const express = require('express')
const app = express()
// const PORT = 4080
const PORT = process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET
const expressEjsLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
// const mongoose = require('mongoose')
// const db = mongoose.connection
const wineController = require('./controllers/wineController')
const beerController = require('./controllers/beerController')
const sessionsController = require('./controllers/sessionsController')

// const mongoURI = 'mongodb://127.0.0.1:27017/imbibed'
const Wine = require('./models/wineSchema')
const wineSeed = require('./models/wineSeed.js')

const Beer = require('./models/beerSchema')
// const beerSeed = require('./models/beerSeed.js')


app.use(express.static('./public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(expressEjsLayout)
app.set('view engine', 'ejs')

//  Session Middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))



// mongoose.connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     }).then(
//     () => {
//         console.log('The connection with mongod is established')
//     }).catch((error) => {
//         console.log(error)
//     })



//     db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
//     db.on('connected', () => console.log('mongo connected: ', mongoURI))
//     db.on('disconnected', () => console.log('mongo disconnected'))

app.use('/wines', wineController)
app.use('/beers', beerController)
app.use('/session', sessionsController)

// HOME Route:

app.get('/', (req, res) => {
    res.render('index')
})


// ------- Code to clear and re-populate  wine db ---------------------

// Wine.collection.drop()

// Wine.create( wineSeed, (err, data) => {
//     if(err) {
//         console.log(err.message)

//     }else{
//         console.log(`added Wine data: ${data}`)
//     }
// })

// --------------------------------------------------------------------

app.listen(PORT, () => {
    console.log(`Drink Up! on PORT: ${PORT}`)
})