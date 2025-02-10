import User from '../users/user.model.js';
import Course from '../course/course.model.js';
import { checkPassword, encrypt } from '../../utils/encryp.js'

export const assignCourseToStudent = async (req, res) => {
    try {
        const { userId, courseId } = req.body
        
        // Busca al estudiante
        const student = await User.findById(userId)

        if (!student) {
            return res.status(404).send(
                { message: 'Student not found' 

                }
            )
        }

        // Ayuda a ver si ya tiene asignado cursos
        if (student.courses.length >= 3) {
            return res.status(400).send(
                {
                     message: 'Cannot assign more than 3 courses'
                     }
                    )
        }

        // Valida si el curso existe
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(400).send(
                { 
                    message: 'Course does not exist'
                 }
                )
        }

        //  Verifica si el curso ya esta asignado
        if (student.courses.includes(courseId)) {
            return res.status(400).send(
                { 
                    message: 'Course is already assigned' 
                }
            )
        }

        // Asigna el nuevo crso
        student.courses.push(courseId)
        await student.save() 

        return res.send(
            { 
                message: 'Course assigned successfully', 
                courses: student.courses 
            }
        )

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { 
                message: 'General error with course assignment',
                 err 
                }
            )
    }
}

export const getAssignedCourses = async (req, res) => {
    try {
        const userId = req.params.id

        const student = await User.findById(userId).populate('courses')

        if (!student) {
            return res.status(404).send(
                {
                     message: 'Student not found' 
                    }
                )
        }

        return res.send({ courses: student.courses })

    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                 message: 'General error with fetching courses',
                  err
            }
        )
    }
}


export const updateStu = async(req, res)=>{
    try{
        const { id } = req.params
 
        const data = req.body
 
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
 
        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}

export const deleteStu = async (req, res) => {
    try {
        const userId = req.params.id

        const user = await User.findByIdAndDelete(userId)
        if (!user) {
            return res.status(404).send(
                {
                     message: 'User  not found'
                     }
                    )
        }

        return res.send({ message: 'Profile deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
             message: 'Error deleting profile', 
             err 
            }
        )
    }
}

export const updatePassword = async (req, res) => {
    try {
        const { id } = req.params // Extraer el ID del usuario de los parámetros de la solicitud
        const { oldPassword, newPassword } = req.body// No necesitas userLoggin si estás usando el ID

        // Buscar el usuario por ID
        const user = await User.findById(id) // Usar findById para buscar al usuario por su ID

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User  not found'
            })
        }

        // Verificar la contraseña antigua
        if (!await checkPassword(user.password, oldPassword)) {
            return res.status(400).send({
                success: false,
                message: 'Old password is incorrect'
            })
        }

        // Encriptar la nueva contraseña
        user.password = await encrypt(newPassword) // Encriptar la nueva contraseña
        const updatedUser  = await user.save()// Guardar el usuario con la nueva contraseña encriptada

        return res.send({
            success: true,
            message: 'Password updated successfully',
            user: updatedUser   
        }
    )
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            { message: 'General error with update password function', err }
        )
    }
}