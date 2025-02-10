import mongoose from 'mongoose'
import { Schema, model } from 'mongoose';

const courseSchema = Schema(
    {
        courseName: {
            type: String,
            required: [true, 'Course name is required'],
            minLength: [5, '5 characters minimum'],
            maxLength: [70, 'Maximum characters is 70']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            maxLength: [200, 'Maximum characters is 200']
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User ', // Asegúrate de que esto apunte al modelo correcto
            
        }
    }
);


export default model('Course', courseSchema)