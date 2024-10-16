const Joi = require('joi');

const courseSchema = Joi.object({
    Course_Name: Joi.string().pattern(new RegExp('^[a-zA-Z. ]+$')).required(),
    Fee: Joi.number().required(),
    Min_Year: Joi.number().required(),
    Max_Year: Joi.number(),
    Eligibility: Joi.string().pattern(new RegExp('^[a-zA-Z0-9.% ]+$')).required(),
    Category: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required(),
})

const updateCourseSchema = Joi.object({
    Course_Name: Joi.string().pattern(new RegExp('^[a-zA-Z. ]+$')),
    Fee: Joi.number(),
    Min_Year: Joi.number(),
    Max_Year: Joi.number(),
    Eligibility: Joi.string().pattern(new RegExp('^[a-zA-Z0-9.% ]+$')),
    Category: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')),
}).or('Course_Name', 'Fee', 'Min_Year', 'Max_Year', 'Eligibility', 'Category')

module.exports = { courseSchema, updateCourseSchema }
