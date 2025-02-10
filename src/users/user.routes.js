import { Router } from "express";
import { registerStudent, registerTeacher } from './user.controller.js'

const api = Router()



api.post('/registerStudent', registerStudent)
api.post('/registerTeacher', registerTeacher)
export default api