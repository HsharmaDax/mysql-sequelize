const Joi = require('joi');

const transactionSchema = Joi.object({
    Name: Joi.string().pattern(new RegExp('^[a-zA-Z]+( [a-zA-Z]+)*$')).required(),
    Email: Joi.string().email().required(),
    DOB: Joi.date().required(),
    Father_Name: Joi.string().pattern(new RegExp('^[a-zA-Z]+( [a-zA-Z]+)*$')).required(),
    Gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    Address_Id: Joi.number().integer(),
    Course_Id: Joi.number().integer().required(),
    House_No: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_ ]+$')).required(),
    Pin: Joi.number().integer().required(),
    City: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).max(100).required(),
    State: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).max(100).required(),
    Country: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).max(100).required()
})

module.exports = { transactionSchema}