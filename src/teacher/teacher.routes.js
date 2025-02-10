import { Router } from "express";
import { createCourse, deleteCourse, editCourse, getCourses } from "./teacher.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { isTeacher } from "../../utils/db.validators.js";


const api = Router()



api.post('/create',validateJwt, isTeacher,createCourse)
api.put('/edit/:id',validateJwt, isTeacher, editCourse)
api.delete('/delete/:id', validateJwt, isTeacher, deleteCourse)
api.get('/list/:id', validateJwt, isTeacher, getCourses)

export default api