const mongoose = require('mongoose')
const validator = require('validator')
const { Schema } = mongoose
const amenitiesSchema = new Schema({
    wifi: {
        type: String,
        //required: true
    },
    laundery: {
        type: String,
        //required: true
    },
    mess: {
        type: Number,
        //required: true
    },
    tv: {
        type: Number,
        //required: true
    },
    refrigerator: 
        {
            type: String
        },
    lift: 
        {
            type: String
        }
    ,
    roomcleaning: {
        type: String,
        //required: true,
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Amenities = mongoose.model('Amenities', amenitiesSchema)

module.exports = {
    Amenities   
}