const Joi = require("joi");

const inputValidate = (schema) => {
    return (req, res, next) => {
        const method = req.method;
        switch (method) {
            case 'PUT':
                const data = req.params;
                const id = data.id;
                const idSchema = Joi.number().integer().required()
                const idValidate = idSchema.validate(id);
                if (idValidate.error) {
                    console.error(idValidate.error.message);
                    return res.status(400).json({ error: 'Bad request' });
                }
                const { error: updateBodyError } = schema.validate(req.body);
                if (updateBodyError) {
                    console.error(updateBodyError.message);
                    return res.status(400).json({ error: 'Bad request' })
                }
                next();
                break;
            case 'POST':
                const { error: postBodyError } = schema.validate(req.body);
                if (postBodyError) {
                    console.error(postBodyError.message);
                    return res.status(400).json({ error: 'Bad request' })
                }
                next();
                break;
            case 'DELETE':
                const deletedata = req.params;
                const deleteId = deletedata.id;
                const deleteIdSchema = Joi.number().integer().required()
                const { error: deleteIdError } = deleteIdSchema.validate(deleteId);
                if (deleteIdError) {
                    console.error(deleteIdError.message);
                    return res.status(400).json({ error: 'Bad request' })
                }
                next();
                break;
            case 'GET':

                break;
        }
    }
}

module.exports = { inputValidate }