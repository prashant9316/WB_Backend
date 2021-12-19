require('dotenv').config()

const frontend = 'http://127.0.0.1:8081'
const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

const whitelistip = ['http://localhost', 'http://127.0.0.1', 'http://3.109.88.70',
'https://localhost', 'https://127.0.0.1', 'https://3.109.88.70',
'https://wanderingbackpackers.com', 'http://wanderingbackpackers.com' ]
const corsOptionsDelegate = function (req, callback) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;;
    let corsOptions;
    if(whitelistip.indexOf(req.header('Origin')) !== -1){
        corsOptions = { origin: true, credentials: true, methods: ['GET', 'POST']}
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

var corsOptions = {
    origin: frontend,
    methods: [
        'GET', 
        'POST'
    ],
    credentials: true,

};
if(process.env.PRODUCTION == 'local'){
    console.log("LOCAL ENV")
    app.use(cors(corsOptions))
} else if(process.env.PRODUCTION == 'PRODUCTION'){
    console.log("PRODUCTION ENV")
    app.use(cors(corsOptionsDelegate))
}
console.log(process.env.PRODUCTION)

// Middlewares
app.use(cookieParser())
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

app.options('*', cors())

// Imported Routes for User
require('./src/routes/auth2.routes')(app); // User Login
require('./src/routes/userprofile.routes')(app);
require('./src/routes/cart.routes')(app);
require('./src/routes/order.routes')(app);

// Starting the Server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Open the backend server on url: http://${process.env.HOST}:${process.env.PORT}`)
})