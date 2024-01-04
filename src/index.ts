import express, { Express } from 'express'
import { join } from 'path'
import 'dotenv/config'

import '@/common/infrastructure/logger'
import { mongoose, redis } from '@/common/dataSources'
import {
  corsMiddleware,
  authMiddleware,
  notFoundMiddleware
} from '@/common/middlewares'
import { router } from '@/routes'
import { i18next, i18nextHttpMiddleware } from '@/common/i18n'

mongoose.run()
redis.run()

const app: Express = express()

app.use(
  join('/', process.env.STORAGE_PATH),
  express.static(join(__dirname, process.env.STORAGE_PATH))
)

app.use(
  express.json({ limit: '10mb' }),
  express.urlencoded({ limit: '10mb', extended: true }),
  corsMiddleware,
  i18nextHttpMiddleware.handle(i18next),
  authMiddleware,
  router,
  notFoundMiddleware
)

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`)
})
