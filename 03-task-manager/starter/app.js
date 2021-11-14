const express = require('express');
const app = express();
const tasks = require('./routes/tasks');

// connect to mongo db
const connectDB = require('./db/connect');

require('dotenv').config();

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.get('/hello', (req, res) => {
    console.log("hello");
    res.send("hello");
})

app.use('/api/v1/tasks', tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = 3000

const start = async() => {
    try {
        // connectDB
        // connect Mongoose
        await connectDB(process.env.MONGO_URL);

        // open server port
        app.listen(port, console.log(`Server is listening port ${port}`))
    } catch (err) {
        console.log(err);
    }
}

start();