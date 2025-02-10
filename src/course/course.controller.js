import Course from "../course/course.model.js"

export const saveCourse = async (req, res) =>{
    try {
        let data = req.body

        let course = Course(data)

        await course.save()

        return res.send({
            message: 
            `Course successfully registered.`
        })
    
    } catch (err) {
        console.error(err)
        return res.status(500).send(
            {
                message: 'General error with user registration',
                 err
                }
            )
    }
}
