if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

var corsOptions = {
    origin: "*",
    methods: [
        'GET', 
        'POST'
    ],
    credentials: true
};

// Middlewares
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))


// Mongoose ODM
mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    ()=> console.log("connected to the db!")
)

app.get('/', (req, res) => {
    return res.send("Hello World!")
})

// Imported Routes for User
require('./src/routes/auth2.routes')(app); // User Login


// Starting the Server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Open the backend server on url: http://${process.env.HOST}:${process.env.PORT}`)
})