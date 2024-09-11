const Joi = require('joi');

const addressSchema = Joi.object({
    House_No: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_ ]+$')).required(),
    Pin: Joi.number().integer().required(),
    City: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required(),
    State: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required(),
    Country: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).required()
})
const updateAddressSchema = Joi.object({
    House_No: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_ ]+$')),
    Pin: Joi.number().integer(),
    City: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')),
    State: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')),
    Country: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$'))
}).or('House_No', 'Pin', 'City', 'State', 'Country')

module.exports = { addressSchema, updateAddressSchema }
