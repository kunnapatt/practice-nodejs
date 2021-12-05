require('dotenv').config();
require('express-async-errors');

// extra security packages 
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express');
const app = express();

const authRouter = require('./routes/auth')
const jobRouter = require('./routes/jobs')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes.
    max: 100 // limit each IP to 100 requests per windows.
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

// extra packages

// connect db
const connectDB = require('./db/connect');

const authenticateUser = require('./middleware/authentication');

// 

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();