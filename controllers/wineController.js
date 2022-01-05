const express = require('express')
const router = express.Router()
const Wine = require('../models/wineSchema')


// Routes:

// NEW Route:

router.get('/new', (req, res) => {
    res.render('new')
})

// // HOME Route:

// router.get('/', (req, res) => {
//    res.render('index')
// })

// WINES HOME Route:

router.get('/', (req, res) => {
    res.render('showWineList')
})


// Show Route

router.get('/:id', (req, res) => {
    res.render('showWine')
})

module.exports = router