const Joi = require("joi");
const status400 = require("../modularGenerator/resModular");

const inputValidate = (schema , paramSchema) => {
    return (req, res, next) => {
        const method = req.method;
        switch (method) {
            case 'PUT':
                const data = req.params;
                const paramsValidate = paramSchema.validate(data);
                if (paramsValidate.error) {
                    console.log(paramsValidate.error.message)
                    return status400('Bad request')
                }
                const { error: updateBodyError } = schema.validate(req.body);
                if (updateBodyError) {
                    return status400('Bad request')
                }
                next();
                break;
            case 'POST':
                const { error: postBodyError } = schema.validate(req.body);
                if (postBodyError) {
                    return status400('Bad request')
                }
                next();
                break;
            case 'DELETE':
                const deletedata = req.params;
                const { error: deleteIdError } = schema.validate(deletedata);
                if (deleteIdError) {
                    return status400('Bad request')
                }
                next();
                break;
            case 'GET':

                break;
        }
    }
}

module.exports = { inputValidate }