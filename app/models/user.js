const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')

const { Schema } = mongoose
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ]
})

const User = mongoose.model('User', userSchema)


userSchema.pre('save', function (next) {
    if (this.isNew) {
        bcryptjs.genSalt(10).then((salt) => {
            bcryptjs.hash(this.password, salt).then((hashedPassword) => {
                this.password = hashedPassword
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.statics.findByEmailAndPassword = function (email, password) {
    const User = this
    return User.findOne({ email })
        .then((user) => {
            if (user) {
                return bcryptjs.compare(password, user.password).then((result) => {
                    if (result) {
                        return Promise.resolve(user)
                    } else {
                        return Promise.reject('invalid email id or password')
                    }
                })
            } else {
                return Promise.reject('invalid email id or password')
            }
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

userSchema.statics.findByToken = function (token) {
    const User = this
    let tokenData
    try {
        tokenData = jwt.verify(token, 'kumar@123')
    } catch (err) {
        return Promise.reject(err)
    }
    return User.findOne({
        _id: tokenData.userId,
        'tokens.token': token
    })
        .then((user) => {
            return Promise.resolve(user)
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

userSchema.methods.generateToken = function () {
    const user = this
    const tokenData = {
        userId: user._id
    }
    const token = jwt.sign(tokenData, 'kumar@123')
    user.tokens.push({
        token
    })
    return user.save().then((user) => {
        return token
    }).catch((err) => {
        return err
    })
}

module.exports = {
    User
}