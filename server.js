if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const frontend = 'http://127.0.0.1:8081'
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

var corsOptions = {
    origin: frontend,
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
require('./src/routes/userprofile.routes')(app);
require('./src/routes/cart.routes')(app);
require('./src/routes/order.routes')(app);

// Starting the Server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Open the backend server on url: http://${process.env.HOST}:${process.env.PORT}`)
})