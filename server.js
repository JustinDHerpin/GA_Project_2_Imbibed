require('dotenv').config()
const express = require('express')
const app = express()
app.set('port', process.env.PORT || 4080)
const SESSION_SECRET = process.env.SESSION_SECRET
const expressEjsLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const wineController = require('./controllers/wineController')
const beerController = require('./controllers/beerController')
const sessionsController = require('./controllers/sessionsController')

const Wine = require('./models/wineSchema')
const wineSeed = require('./models/wineSeed.js')

const Beer = require('./models/beerSchema')



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



// Custom Middleware for session user availability to all routes:

app.use((req, res, next) => {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    next()
})

// Middleware for flash messaging

app.use((req, res, next) => {
    res.locals.userId = req.session.userId
    res.locals.message = req.session.message
    req.session.message = ""
    next()
})

// Authentication middleware

const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('session/login')
    }
}

// Setting up controllers:

app.use('/wines', authRequired, wineController)
app.use('/beers', authRequired, beerController)
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

app.listen(app.get('port'), () => {
    console.log(`Drink Up! on PORT: ${app.get('port')}`)
})