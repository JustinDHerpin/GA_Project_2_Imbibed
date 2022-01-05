const express = require('express')
const app = express()
const port = 4080
const expressEjsLayout = require('express-ejs-layouts')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const db = mongoose.connection
const wineController = require('./controllers/wineController')

const mongoURI = 'mongodb://localhost:27017/imbibed'
const Wine = require('./models/wineSchema')
const wineSeed = require('./models/wineSeed.js')

app.use(express.static('./public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(expressEjsLayout)
app.set('view engine', 'ejs')

app.use('/wines', wineController)


mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    },
    () => {
        console.log('The connection with mongod is established')
    })

    db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
    db.on('connected', () => console.log('mongo connected: ', mongoURI))
    db.on('disconnected', () => console.log('mongo disconnected'))

// HOME Route:

app.get('/', (req, res) => {
    res.render('index')
})

// Wine.collection.drop()

// Wine.create( wineSeed, (err, data) => {
//     if(err) {
//         console.log(err.message)

//     }else{
//         console.log(`added Wine data: ${data}`)
//     }
// })

    
app.listen(port, () => {
    console.log(`Drink Up! on port: ${port}`)
})