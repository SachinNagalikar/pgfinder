const express = require('express')
const multer = require('multer')
const router = express.Router()
const { Amenities } = require('../models/amenities')
const { authenticate } = require('../middleware/authenticate')

router.get('/', authenticate, (req, res) => {
    Amenities.find()
        .then((data) => {
            if (data) {
                res.send(data)
            } else {
                res.send({ notice: "There is no amenities" })
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id
    Amenities.findOne({
        user: req.user._id,
        _id: id
    })
        .then((data) => {
            if (data) {
                res.send(data)
            } else {
                res.send({ notice: "there is no amenity" })
            }
        })
        .catch((err) => {
            res.send(err)
        })
})


router.post('/', authenticate, (req, res) => {
    const body = req.body
    const amenities = new Amenities(body)
    amenities.user = req.user._id
    amenities.save()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', authenticate, (req, res) => {
    const id = req.params.id
    const body = req.body
    Amenities.findOneAndUpdate({ _id: id, user: req.user._id }, { $set: body }, { new: true })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id
    Amenities.findByIdAndDelete({
        _id: id,
        user: req.user._id
    })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    amenitiesRouter: router
}