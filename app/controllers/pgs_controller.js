const express = require('express')
const router = express.Router()
const { Pg } = require('../models/pg_detail')

router.get('/', (req, res) => {
    Pg.find()
        .then((pg) => {
            if (pg) {
                res.send(pg)
            } else {
                res.send({ notice: "There is no pg's" })
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id
    Pg.findById(id)
        .then((pg) => {
            if (pg) {
                res.send(pg)
            } else {
                res.send({ notice: "there is no pg's" })
            }
        })
        .catch((err) => {
            res.send(err)
        })
})

router.post('/', (req, res) => {
    const body = req.body
    const pg = new Pg(body)
    pg.save()
        .then((pg) => {
            res.send(pg)
        })
        .catch((err) => {
            res.send(err)
        })
})

//check this route
router.put('/:id', (req, res) => {
    const id = req.params.id
    const pg = req.body
    Pg.findOneAndUpdate(id, pg, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
        .then((pg) => {
            res.send(pg)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    Pg.findByIdAndDelete(id)
        .then((pg) => {
            res.send(pg)
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    pgsRouter: router
}