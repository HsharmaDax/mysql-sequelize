const Joi = require('joi');

const addressSchema = Joi.object({
    House_No: Joi.string().required(),
    Pin: Joi.number().integer().required(),
    City: Joi.string().required(),
    State: Joi.string().required(),
    Country: Joi.string().required()
})
const updateAddressSchema = Joi.object({
    House_No: Joi.string(),
    Pin: Joi.number().integer(),
    City: Joi.string(),
    State: Joi.string(),
    Country: Joi.string()
}).or('House_No', 'Pin', 'City', 'State', 'Country')

module.exports = { addressSchema, updateAddressSchema }
