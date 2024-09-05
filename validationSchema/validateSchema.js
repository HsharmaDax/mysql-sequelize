const Joi = require('joi');

const studentSchema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().email().required(),
    DOB: Joi.date().required(),
    Father_Name: Joi.string().required(),
    Gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    Address_Id: Joi.number().integer(),
    Course_Id: Joi.number().integer().required()
})

const courseSchema = Joi.object({
    Course_Name: Joi.string().required(),
    Fee: Joi.number().required(),
    Min_Year: Joi.number().required(),
    Max_Year: Joi.number(),
    Eligibility: Joi.string().required(),
    Category: Joi.string().required(),
})

const addressSchema = Joi.object({
    House_No: Joi.string().required(),
    Pin: Joi.number().integer().required(),
    City: Joi.string().required(),
    State: Joi.string().required(),
    Country: Joi.string().required()
})

const transactionSchema = Joi.object({
    Name: Joi.string().required(),
    Email: Joi.string().email().required(),
    DOB: Joi.date().required(),
    Father_Name: Joi.string().required(),
    Gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    Address_Id: Joi.number().integer(),
    Course_Id: Joi.number().integer().required(),
    House_No: Joi.string().required(),
    Pin: Joi.number().integer().required(),
    City: Joi.string().required(),
    State: Joi.string().required(),
    Country: Joi.string().required()
})

const updateStudentSchema = Joi.object({
    Name: Joi.string(),
    Email: Joi.string().email(),
    DOB: Joi.date(),
    Father_Name: Joi.string(),
    Gender: Joi.string().valid('Male', 'Female', 'Other'),
    Address_Id: Joi.number().integer(),
    Course_Id: Joi.number().integer()
}).xor('Name', 'Email', 'DOB', 'Father_Name', 'Gender', 'Address_Id', 'Course_Id')

const updateCourseSchema = Joi.object({
    Course_Name: Joi.string(),
    Fee: Joi.number(),
    Min_Year: Joi.number(),
    Max_Year: Joi.number(),
    Eligibility: Joi.string(),
    Category: Joi.string(),
}).xor('Course_Name', 'Fee', 'Min_Year', 'Max_Year', 'Eligibility', 'Category')

const updateAddressSchema = Joi.object({
    House_No: Joi.string(),
    Pin: Joi.number().integer(),
    City: Joi.string(),
    State: Joi.string(),
    Country: Joi.string()
}).xor('House_No', 'Pin', 'City', 'State', 'Country')


module.exports = { studentSchema, addressSchema, courseSchema, updateStudentSchema, updateAddressSchema, updateCourseSchema , transactionSchema}