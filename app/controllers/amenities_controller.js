const express = require('express')
const router = express.Router()
const { Amenitie } = require('../models/amenities')

router.get('/', (req, res) => {
    Amenitie.find()
        .then((amenitie) => {
            res.send(amenitie)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', (req, res) => {
    const body = req.body
    const amenitie = new Amenitie(body)
    amenitie.save()
        .then((amenitie) => {
            res.send(amenitie)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    Amenitie.findOneAndUpdate(id, body, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
        .then((amenitie) => {
            res.send(amenitie)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Amenitie.findByIdAndDelete(id)
        .then((amenitie) => {
            res.send(amenitie)
        })
        .catch((err) => {
            res.send(amenitie)
        })
})

module.exports = {
    amenitiesRouter: router
}