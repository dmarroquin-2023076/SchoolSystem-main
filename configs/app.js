'use strict'

import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"

import { limiter } from "../middlewares/rate.limit.js"
import authRoutes from "../src/auth/auth.routes.js"
import courseRoutes from "../src/course/course.routes.js"
import userRoutes from "../src/users/user.routes.js"
import studentRoutes from "../src/student/student.routes.js"
import teacherRoutes from "../src/teacher/teacher.routes.js"


const configs = (app)=>{
    app.use(express.json()) 
    app.use(express.urlencoded({extended: false})) 
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter) 
}

const routes = (app)=>{
   app.use(authRoutes)
   app.use('/v1/course',courseRoutes)
   app.use('/v1/users', userRoutes)
   app.use('/v1/student', studentRoutes)
   app.use('/v1/teacher', teacherRoutes)
}




export const initServer = ()=>{
    const app = express() 
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}