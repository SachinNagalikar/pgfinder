const mongoose = require('mongoose')
// DB CONFIGURATION
// telling mongoose to use es6's promise library

const CONNECTION_URI = process.env.MONGODB_URI || "mongodb+srv://sachin:S@chin123@paying-guest-xd0r7.mongodb.net/test?retryWrites=true&w=majority"

mongoose.Promise = global.Promise
mongoose.connect(CONNECTION_URI, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('Error connecting to DB', err)
    })

module.exports = {
    mongoose 
}   