import User from '../users/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const registerStudent = async (req, res) => {
    try {
        let data = req.body

        // Crear el objeto del modelo agregándole los datos capturados
        let user = new User(data)
        user.password = await encrypt(user.password)

        // Asignar rol de estudiante por defecto
        user.role = 'STUDENT_ROLE'

        await user.save()
        return res.send({
            message: `Registered successfully as a student, can be login with username: ${user.username}`
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            message: 'General error with student registration',
            err
        })
    }
}

export const registerTeacher = async (req, res) => {
    try {
        let data = req.body

        // Crear el objeto del modelo agregándole los datos capturados
        let user = new User(data)
        user.password = await encrypt(user.password)

        // Asignar rol de maestro
        user.role = 'TEACHER_ROLE'

        await user.save()

        return res.send({
            message: `Registered successfully as a teacher, can be login with username: ${user.username}`
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            message: 'General error with teacher registration',
            err
        })
    }
}

