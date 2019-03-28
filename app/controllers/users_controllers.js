const express = require('express')
const router = express.Router()
const { User } = require('../models/user')

//post;user register
router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send({
                user,
                notice: 'successfully registered'
            })
            console.log(user);
        })
        .catch((err) => {
            res.send(err)
        })
})

//login user
router.post('/login', (req, res) => {
    const body = req.body
    User.findByEmailAndPassword(body.email, body.password)
        .then((user) => {
            console.log(user);
            return user.generateToken()
        })
        .then((token) => {
            res.send({
                token
            })
        })
        .catch((err) => {
            res.status('404').send(err)
        })
})

//user logout
router.delete('/logout', (req, res) => {
    const tokenData = req.token
    const user = req.user
    var newTokenData = user.tokens.filter(x => x.token != tokenData)
    user.tokens = newTokenData
    user.save()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    usersRouter: router
}