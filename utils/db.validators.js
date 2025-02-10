//Validar datos relacionados a la BD

import User from '../src/users/user.model.js'

export const existUsername = async(username, user )=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && alreadyUsername._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}


//Middlewares para validar su rol
export const isTeacher = (req, res, next) => {
    const userRole = req.user.role

    if (userRole !== 'TEACHER_ROLE') {
        return res.status(403).send(
            {
                 message: 'Your role is not suitable for this operation'
                 }
                )
    }
    next() 
}

export const isStudent = (req, res, next) => {
    const userRole = req.user.role 

    if (userRole !== 'STUDENT_ROLE') {
        return res.status(403).send(
            {
                 message: 'Your role is not suitable for this operation'
                 }
                )
    }

    next()
}

