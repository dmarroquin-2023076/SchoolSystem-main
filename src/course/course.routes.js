import { Router } from 'express'
import { saveCourse } from './course.controller.js'
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/save',validateJwt, saveCourse)

export default api