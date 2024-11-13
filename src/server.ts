import express, { Application } from 'express'
import { logger } from './utils/logger'
import bodyParser from 'body-parser'
import cors from 'cors'
import { routes } from './routes/index.router'

// DB connection
import './utils/connection'

const app: Application = express()
const port: number = 2000

// parse body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

routes(app)

app.listen(port, () => logger.info(`Server is listening on port ${port}`))
