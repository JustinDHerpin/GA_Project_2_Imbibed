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
        res.render('indexWines', {items})
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

// PUT/PATCH Route for Edit/Update:

router.put('/:id', (req, res) => {
    Wine.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
        res.redirect('/wines/' + req.params.id)
        // console.log(err)
        console.log(updatedItem)
        
    })
})

// POST route:

router.post('/', (req, res) => {
    Wine.create(req.body, (error, item) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect('/wines')
        }
        
    })
})

module.exports = router