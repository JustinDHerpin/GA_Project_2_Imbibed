const express = require('express')
const router = express.Router()
const Wine = require('../models/wineSchema')
const User = require('../models/user')


// Routes:

// NEW Route:

router.get('/new', (req, res) => {
    res.render('new')
})


// WINES HOME Route:

router.get('/', (req, res) => {
    Wine.find({ owner: req.session.userId }, (err, items) => {
        res.render('indexWines', {
            items,
        })
    })
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
    if(req.body.liked === 'on'){
        req.body.liked = true
    }else{
        req.body.liked = false
    }

    Wine.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedItem) => {
        res.redirect('/wines/' + req.params.id)
        // console.log(err)
        //console.log(updatedItem)
        
    })
})

// POST route:

router.post('/', async (req, res) => {
    const owner = await User.findById(req.session.userId)

    const newWine = ({
        ...req.body,
        owner: owner
    })

    const createWine = await Wine.create(newWine)

    if (createWine) res.redirect('/wines')
})

// DELETE Route:

router.delete('/:id', (req, res) => {
    Wine.findByIdAndDelete(req.params.id, (err, deletedWine) => {
        res.redirect('/wines')
    })
})

module.exports = router