const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('session controller works')
})

router.get('/register', (req, res) => {
    res.render('sessions/register.ejs')
})

router.post('/register', async (req, res, next) => {
    try {
        if (req.body.password === req.body.verifyPassword) {
            const desiredUsername = req.body.username
            const userExists = await User.findOne({ username: desiredUsername })
            if (userExists) {
                res.send('Username already taken')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                console.log(createdUser)
                res.send('check your terminal')
            }
        } else {
            console.log(req.body)
            res.send('Passwords must match!')
        }
    } catch (err) {
        next(err)
    }
})

router.get('/login', (req, res) => {
    res.render('sessions/login.ejs')
})

router.post('/login', async (req, res, next) => {
    try {
        const userToLogin = await User.findOne({ username: req.body.username })
        if (userToLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (validPassword) {
                res.send('User is logged in')
            } else {
                res.redirect('/session/login')
            }
        } else {
            res.redirect('/session/login')
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router