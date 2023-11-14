import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import logger from './utils/logger.js'
import connectDB from "./utils/connectDB.js";
import {authRouter} from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";

const result = dotenv.config()
if (result.error) {
    console.log('Can\'t load environment variables now')
    process.exit(0)
}

const app = express()

app.use(express.json(), cors(), cookieParser(process.env.COOKIE_SECRET))

app.get('/', (req, res) => {
    res.end(`<h1>Typing app endpoint</h1>`)
})

app.use('/api/v1/auth', authRouter)
app.use(errorHandler)
app.use('*', (req, res) => {
    res.status(404).json({error: "Not found"})
})


await connectDB()

app.listen(process.env.PORT, () => {
    logger.info(`Server listening on http://localhost:${process.env.PORT}`)
})