const mongoose = require('mongoose')

const { Schema } = mongoose
const amenitieSchema = new Schema({
    amenities: [
        {
            amenitie: {
                type: String,
                required: true
            }
        }
    ]
})

const Amenitie = mongoose.model('Amenitie', amenitieSchema)

module.exports = {
    Amenitie
}