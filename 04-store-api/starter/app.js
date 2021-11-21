// console.log('04 Store API')

require('dotenv').config();

require('express-async-errors')

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const notFound = require('./middleware/not-found');
const errMidleware = require('./middleware/error-handler');

const productRouter = require('./routes/products');

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send("Everyday world")
})

app.use('/api/v1/products', productRouter)

app.use(notFound)
app.use(errMidleware)

const port = process.env.PORT || 3000

const start = async() => {
    try {
        // connect DB
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (err) {
        console.log(err)
    }
}

start()