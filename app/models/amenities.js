const mongoose = require('mongoose')

const { Schema } = mongoose
const amenitiesSchema = new Schema({
    name: [
        {
            type: String,
            // required: true
        }
    ]
})

const Amenities = mongoose.model('Amenities', amenitiesSchema)

module.exports = {
    Amenities
}