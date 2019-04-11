const mongoose = require('mongoose')
const validator = require('validator')

const { Schema } = mongoose
const pgSchema = new Schema({
    pgName: {
        type: String,
        //required: true
    },
    pgRent: {
        type: Number,
        //required: true
    },
    deposit: {
        type: Number,
        //required: true
    },
    roomTypes: [
        {
            type: String
        }
    ],
    amenities: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Amenities'
            // type: String
        }
    ],
    address: {
        type: String,
        //required: true
    },
    image: [
        {
            type: String,
            //required: true
        }
    ],
    foods: {
        type: String
    },
    pgTypes: {
        type: String
    },
    description: {
        type: String,
        //required: true
    },
    rules: {
        type: String,
        //required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Pg = mongoose.model('Pg', pgSchema)

module.exports = {
    Pg
}