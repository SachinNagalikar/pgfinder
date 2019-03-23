const express = require('express')
const router = express.Router()

const { User } = require('../models/user')
//const {authenticate}=require('../middleware/authenticate')


router.get('/', (req, res) => {
    User.find()
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            res.send(err)
        })
})


router.post('/register', (req, res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then((user) => {
       res.send({user,
            notice: 'successfully registered'
       })
    })     
        .catch((err) => {
            res.send(err)
        })
})

router.post('/login', (req, res) => {
    const body = req.body
    User.findByEmailAndPassword(body.email, body.password)
        .then((user) => {
        return user.generateToken()
        })
        .then((token) => {
        res.send({token})
        })
        .catch((err) => {
        res.send(err)
    })
})

router.delete('/logout',  (req, res) => {
    User.findOne({
        _id: req.user._id
    })
        .then((user) => {
            user.tokens = user.tokens.filter(tokenItem => tokenItem.token != req.token)
            user.save()
                .then((user) => {
                    res.send({
                        user,
                        notice:"successfully logged out"
                })
                })
            .catch(err=>res.send(err))
        })
        .catch((err) => {
        res.send(err)
    })

})


router.delete('/logoutall', (req, res) => {
    User.findOne({
        _id:req.user._id
    })
        .then((user) => {
            user.tokens = []
            user.save()
                .then((user) => {
                res.send({
                    user,
                    notice:'sucessfully logged out'
                })
                })
            .catch(err=>res.send(err))
        })
        .catch((err) => {
        res.send(err)
    })
})

module.exports = {
    usersRouter: router
}