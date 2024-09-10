const Joi = require('joi')

const addQuestionSchema = Joi.object({
    question: Joi.string().required(), 
    Student_Id: Joi.number().integer().required()
})

const addAnswerSchema = Joi.object({
    answer: Joi.string().required(), 
    Student_Id: Joi.number().integer().required(),
    Question_Id: Joi.number().integer().required(),
})

module.exports = {addQuestionSchema , addAnswerSchema}