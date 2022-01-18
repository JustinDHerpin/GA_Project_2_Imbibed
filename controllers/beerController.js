const express = require('express')
const router = express.Router()
const Beer = require('../models/beerSchema')


// Routes:

// NEW Route:

router.get('/new', (req, res) => {
    res.render('newBeer')
})


// BEERS HOME Route:

router.get('/', (req, res) => {
    
    Beer.find({}, (err, items) => {
        res.render('indexBeers', {items})
    })
})

// SHOW showBeer route:

router.get ('/:id', (req, res) => {
    Beer.findById(req.params.id, (err, item) => {
        res.render('showBeer', {item})
    })
})

// GET Route for Edit/Update:

router.get('/:id/edit', (req, res) => {
    Beer.findById(req.params.id, (err, item) => {
        res.render('editBeer', {item})
    })
})

// PUT/PATCH Route for Edit/Update:

router.put('/:id', (req, res) => {
    if(req.body.liked === 'on'){
        req.body.liked = true
    }else{
        req.body.liked = false
    }

    Beer.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
        res.redirect('/beers/' + req.params.id)
        // console.log(err)
        console.log(updatedItem)
        
    })
})

// POST route:

router.post('/', (req, res) => {
    Beer.create(req.body, (error, item) => {
        if (error) {
            console.log(error)
        } else {
            res.redirect('/beers')
        }
        
    })
})

// DELETE Route:

router.delete('/:id', (req, res) => {
    Beer.findByIdAndDelete(req.params.id, (err, deletedWine) => {
        res.redirect('/beers')
    })
})

module.exports = router