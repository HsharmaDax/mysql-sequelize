const Joi = require('joi')
const paramSchema = Joi.object({
    id: Joi.number().integer(),
    Course_Name : Joi.string(),
    Email : Joi.string().email()
}).xor('id','Course_Name','Email')

module.exports = paramSchema