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
                //console.log('got to log 1')
                const salt = bcrypt.genSaltSync(10)
                //console.log('got to log 2')
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                //console.log('got to log 3')
                req.body.password = hashedPassword
                //console.log('got to log 4')
                //console.log(req.body)
                //console.log('got to log 5')
                //console.log('console logging req.body: ' + req.body)
                const createdUser = await User.create(req.body)
                //console.log('got to log 6')
                //console.log("/register createdUser: " + createdUser)
                //res.send('check your terminal')
                req.session.username = createdUser.username
                res.redirect('/')
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
                req.session.username = userToLogin.username
                // console.log('if statement from password validation /login post route')
                res.redirect('/')
            } else {
                console.log('else statement firing from /login post route')
                res.redirect('/session/login')
            }
        } else {
            console.log('user not found')
            res.redirect('/session/login')
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router