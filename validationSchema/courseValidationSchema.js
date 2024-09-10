const Joi = require('joi');

const courseSchema = Joi.object({
    Course_Name: Joi.string().required(),
    Fee: Joi.number().required(),
    Min_Year: Joi.number().required(),
    Max_Year: Joi.number(),
    Eligibility: Joi.string().required(),
    Category: Joi.string().required(),
})

const updateCourseSchema = Joi.object({
    id: Joi.number().integer().required(),
    Course_Name: Joi.string(),
    Fee: Joi.number(),
    Min_Year: Joi.number(),
    Max_Year: Joi.number(),
    Eligibility: Joi.string(),
    Category: Joi.string(),
}).xor('Course_Name', 'Fee', 'Min_Year', 'Max_Year', 'Eligibility', 'Category')

module.exports = { courseSchema, updateCourseSchema }
