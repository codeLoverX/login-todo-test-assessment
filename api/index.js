const express = require('express')
const app = express()
const dotenv = require("dotenv");
const connectDB = require('./db')
const cors = require('cors')
const { logErrorMiddleware, returnError } = require('./middleware/handleError');
const todoRouter = require('./routes/todo');
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth');
dotenv.config({ path: './.env' })
const port = process.env.PORT || 8000
// middleware & db
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(cookieParser())
app.use(express.json())
connectDB()
app.get("/", (_req, res) => res.status(200).send("Hello"));
app.use("/", authRouter);
app.use("/todo", todoRouter);
// error middleware
app.use(logErrorMiddleware);
app.use(returnError);

app.listen(port, () => console.info(`App started at port ${port}`))

module.exports = app;
