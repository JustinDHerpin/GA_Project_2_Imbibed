const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('session controller works')
})

router.get('/register', (req, res) => {
    res.render('sessions/register.ejs')
})

router.post('/register', async (req, res, next) => {
    try {
        console.log(req.body)
    } catch (err) {
        next(err)
    }
})
module.exports = router