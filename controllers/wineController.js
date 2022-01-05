const express = require('express')
const router = express.Router()
const Wine = require('../models/wineSchema')


// Routes:

// NEW Route:

router.get('/new', (req, res) => {
    res.render('new')
})


// WINES HOME Route:

router.get('/', (req, res) => {
    Wine.find({}, (err, items) => {
        // res.render('indexWines', {items})
        console.log(items)
    })
//     res.render('indexWines')
})

// SHOW route:

router.get ('/:id', (req, res) => {
    Wine.findById(req.params.id, (err, item) => {
        res.render('showWine', {item})
    })
})

// GET Route for Edit/Update:

router.get('/:id/edit', (req, res) => {
    Wine.findById(req.params.id, (err, item) => {
        res.render('edit', {item})
    })
})

// POST route:

// router.post('/', (req, res) => {
//     Product.create(req.body)
//     res.redirect('/products')
// })

module.exports = router