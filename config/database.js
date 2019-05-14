const mongoose = require('mongoose')

const CONNECTION_URI = process.env.MONGODB_URI ||"mongodb+srv://sachin:7795264243s@chin@cluster0-i1xqo.mongodb.net/pgfinder?retryWrites=true"
mongoose.Promise = global.Promise
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to DB')
    })
    .catch((err) => {
        console.log('error connecting to db', err)
    })
module.exports = {
    mongoose
}