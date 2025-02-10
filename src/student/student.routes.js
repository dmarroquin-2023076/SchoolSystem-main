import { Router } from "express";
import { assignCourseToStudent, deleteStu, getAssignedCourses, updatePassword, updateStu } from "./student.controller.js";
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { isStudent } from "../../utils/db.validators.js";
import { updateUserValidator } from "../../middlewares/validators.js";

const api = Router()

api.post('/assign',validateJwt,isStudent ,assignCourseToStudent)
api.get('/:id',validateJwt,isStudent, getAssignedCourses)
api.put('/:id',validateJwt,isStudent,updateUserValidator ,updateStu)
api.delete('/:id',validateJwt, isStudent,  deleteStu)
api.put('/pass/:id', validateJwt, isStudent, updatePassword)
export default api