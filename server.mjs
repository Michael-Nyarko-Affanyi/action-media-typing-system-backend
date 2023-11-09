import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import logger from './utils/logger.js'

const result = dotenv.config()
if (result.error) {
    console.log('Can\'t load environment variables now')
    process.exit(0)
}

const app = express()

app.use(express.json(), cors())

app.get('/', (req, res) => {
    res.end(`<h1>Typing app endpoint</h1>`)
})

app.listen(process.env.PORT, () => {
    logger.info(`Server listening on http://localhost:${process.env.PORT}`)
})