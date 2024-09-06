const Joi = require('joi');

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

module.exports = { transactionSchema}