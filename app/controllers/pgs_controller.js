const express = require('express')
const multer = require('multer')
const router = express.Router()
const { Pg } = require('../models/pg_detail')
// const { upload } = require('../middleware/imageUploads')
const { authenticate } = require('../middleware/authenticate')

router.get('/', authenticate, (req, res) => {
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

router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id
    Pg.findOne({
        user: req.user._id,
        _id: id
    })
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

// router.post('/', upload.array('image', 4), (req, res) => {
//     const body = req.body
//     console.log('body', body)
//     const images = []
//     req.files.forEach(file => {
//         const imageUrl = file.destination
//         const link = "http://localhost:3001" + imageUrl.slice(1) + file.filename
//         images.push(link)
//     })
//     // console.log(images)
//     body.image = images
//     const pg = new Pg(body)
//     pg.save()
//         .then((pg) => {
//             res.send(pg)
//         })
//         .catch((err) => {
//             res.send(err)
//         })
// })
router.post('/', authenticate, (req, res) => {
    const body = req.body
    const pg = new Pg(body)
    pg.user = req.user._id
    pg.save()
        .then((pg) => {
            res.send(pg)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.put('/:id', authenticate, (req, res) => {
    const id = req.params.id
    const body = req.body
    Pg.findOneAndUpdate({ _id: id, user: req.user._id }, { $set: body }, { new: true })
        .then((pg) => {
            res.send(pg)
        })
        .catch((err) => {
            res.send(err)
        })
})

router.delete('/:id', authenticate, (req, res) => {
    const id = req.params.id
    Pg.findByIdAndDelete({
        _id: id,
        user: req.user._id
    })
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