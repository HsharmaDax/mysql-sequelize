const Joi = require("joi");
const status400 = require("../modularGenerator/resModular");

const inputValidate = (schema, paramSchema) => {
    return (req, res, next) => {
        const method = req.method;
        const paramsData = req.params;
        switch (method) {
            case 'PUT':
                const paramsValidate = paramSchema.validate(paramsData);
                if (paramsValidate.error) {
                    console.log(paramsValidate.error.message)
                    return status400(res, 'Bad request')
                }
                const { error: updateBodyError } = schema.validate(req.body);
                if (updateBodyError) {
                    console.log(updateBodyError.message)
                    return status400(res, 'Bad request')
                }
                break;
            case 'POST':
                const { error: postBodyError } = schema.validate(req.body);
                if (postBodyError) {
                    console.log(postBodyError.message)                    
                    return status400(res, 'Bad request')
                }
                break;
            case 'DELETE':
                const { error: deleteIdError } = schema.validate(paramsData);
                if (deleteIdError) {
                    return status400(res, 'Bad request')
                }
                break;
            case 'GET':

                break;
        }
        next();
    }
}

module.exports = { inputValidate }