const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { redirect } = require('express/lib/response')

const router = express.Router()


// Routes:

// GET Route for Register Page

router.get('/register', (req, res) => {
    res.render('sessions/register.ejs')
})

// POST Route to Register New User

router.post('/register', async (req, res, next) => {
    try {
        if (req.body.password === req.body.verifyPassword) {
            const desiredUsername = req.body.username
            const userExists = await User.findOne({ username: desiredUsername })
            if (userExists) {
                req.session.message = 'Username already taken, please try again.'
                res.redirect('/session/register')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.username = createdUser.username
                req.session.loggedIn = true
                req.session.userId = createdUser._id
                res.redirect('/')
            }
        } else {
            req.session.message = 'Passwords must match'
            res.redirect('/session/register')
        }
    } catch (err) {
        next(err)
    }
})

// GET Route for Login Page

router.get('/login', (req, res) => {
    res.render('sessions/login.ejs')
})

// POST Route for Logging in User

router.post('/login', async (req, res, next) => {
    try {
        const userToLogin = await User.findOne({ username: req.body.username })
        if (userToLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (validPassword) {
                req.session.username = userToLogin.username
                req.session.loggedIn = true
                req.session.userId = userToLogin._id
                res.redirect('/')
            } else {
                req.session.message = "Invalid username or password"
                res.redirect('/session/login')
            }
        } else {
            res.redirect('/session/login')
        }
    } catch (err) {
        next(err)
    }
})

// GET Route to Destroy User Session and Return User to Login Page

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/session/login')
})

module.exports = router