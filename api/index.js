const express = require('express')
const app = express()
const dotenv = require("dotenv");
const connectDB = require('./db')
const cors = require('cors')

const { logErrorMiddleware, returnError } = require('./middleware/handleError');
dotenv.config({ path: './.env' })
const port = process.env.PORT || 8000
// middleware & db
app.use(cors()) 
app.use(express.json()) 
connectDB()

app.use(logErrorMiddleware);
app.use(returnError);

app.listen(port, function () {
    console.info(`App started at port ${port}`);
})

module.exports = app;
