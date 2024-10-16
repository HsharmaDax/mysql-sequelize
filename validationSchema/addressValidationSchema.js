const Joi = require('joi');

const addressSchema = Joi.object({
    House_No: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_ ]+$')).required(),
    Pin: Joi.number().integer().required(),
    City: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).max(100).required(),
    State: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).max(100).required(),
    Country: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).max(100).required()
})
const updateAddressSchema = Joi.object({
    House_No: Joi.string().pattern(new RegExp('^[a-zA-Z0-9_ ]+$')),
    Pin: Joi.number().integer(),
    City: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).max(100),
    State: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).max(100),
    Country: Joi.string().pattern(new RegExp('^[a-zA-Z ]+$')).max(100)
}).or('House_No', 'Pin', 'City', 'State', 'Country')

module.exports = { addressSchema, updateAddressSchema }
