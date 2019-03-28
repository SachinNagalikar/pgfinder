const express = require('express')
const mongoose = require('./config/database')
const cors = require('cors')

const { pgsRouter } = require('./app/controllers/pgs_controller')
const { usersRouter } = require('./app/controllers/users_controllers')

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())
app.use('/public/uploads', express.static('public/uploads'))

app.get('/', (req, res) => {
    res.send('welcome to world of PG')
})

app.use('/pgs', pgsRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log('listening to port', port)
})