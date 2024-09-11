const Joi = require('joi');

const studentSchema = Joi.object({
    Name: Joi.string().pattern(new RegExp('^[a-zA-Z]+( [a-zA-Z]+)*$')).required(),
    Email: Joi.string().email().required(),
    DOB: Joi.date().required(),
    Father_Name: Joi.string().pattern(new RegExp('^[a-zA-Z]+( [a-zA-Z]+)*$')).required(),
    Gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    Address_Id: Joi.number().integer(),
    Course_Id: Joi.number().integer().required()
})
const updateStudentSchema = Joi.object({
    Name: Joi.string().pattern(new RegExp('^[a-zA-Z]+( [a-zA-Z]+)*$')),
    Email: Joi.string().email(),
    DOB: Joi.date(),
    Father_Name: Joi.string().pattern(new RegExp('^[a-zA-Z]+( [a-zA-Z]+)*$')),
    Gender: Joi.string().valid('Male', 'Female', 'Other'),
    Address_Id: Joi.number().integer(),
    Course_Id: Joi.number().integer()
}).or('Name', 'Email', 'DOB', 'Father_Name', 'Gender', 'Address_Id', 'Course_Id')

module.exports = { studentSchema, updateStudentSchema }