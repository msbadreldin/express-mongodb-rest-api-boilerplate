import { Router } from 'express'

import { authGuard } from '@/common/guards'
import { mediaController } from '@/controllers'
import { uploadSingleImageMiddleware } from '@/common/middlewares'

export const media = (router: Router): void => {
  router.post(
    '/media/image/upload',
    authGuard.isAuth,
    uploadSingleImageMiddleware,
    mediaController.imageUpload
  )
}
