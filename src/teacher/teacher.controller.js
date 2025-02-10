import Course from '../course/course.model.js';
import User from '../users/user.model.js'

export const createCourse = async (req, res) => {
    try {
        const { courseName, description } = req.body
        const teacherId = req.user.id 
        const existingCourse = await Course.findOne({ courseName })
       
        if (existingCourse) {
            return res.status(400).send({ message: 'The course already exists' });
        }

       
        const newCourse = new Course({
            courseName,
            description,
            teacher: teacherId
        })

        await newCourse.save()
        return res.status(201).send({ message: 'Course created successfully', course: newCourse })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error creating course', err })
    }
};

export const editCourse = async (req, res) => {
    try {
        const { id } = req.params 
        const updates = req.body

        const course = await Course.findByIdAndUpdate(id, updates, { new: true })
        if (!course) {
            return res.status(404).send({ message: 'Course not found' })
        }

        return res.send({ message: 'Course updated successfully', course })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating course', err })
    }
}
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params

        const course = await Course.findById(id)
        if (!course) {
            return res.status(404).send({ message: 'Course not found' })
        }
        //Nos permite desasernos de los cursos en los alumnos asignados, =(uPM funcion moongose, pull elimina datos de un array
        await User.updateMany({ courses: id }, { $pull: { courses: id } })

        await Course.findByIdAndDelete(id)
        return res.send({ message: 'Course deleted successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting course', err })
    }
}

export const getCourses = async (req, res) => {
    try {
        const teacherId = req.user.id

        const courses = await Course.find({ teacher: teacherId })
        return res.send({ courses })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error fetching courses', err })
    }
}
