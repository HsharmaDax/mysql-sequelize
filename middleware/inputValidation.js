const Joi = require("joi");
const status400 = require("../modularGenerator/resModular");

const inputValidate = (schema, paramSchema) => {
    return (req, res, next) => {
        const method = req.method;
        switch (method) {
            case 'PUT':
                const data = req.params;
                const paramsValidate = paramSchema.validate(data);
                if (paramsValidate.error) {
                    console.log(paramsValidate.error.message)
                    return status400(res, 'Bad request')
                }
                const { error: updateBodyError } = schema.validate(req.body);
                if (updateBodyError) {
                    return status400(res, 'Bad request')
                }
                break;
            case 'POST':
                const { error: postBodyError } = schema.validate(req.body);
                if (postBodyError) {
                    return status400(res, 'Bad request')
                }
                break;
            case 'DELETE':
                const paramsData = req.params;
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