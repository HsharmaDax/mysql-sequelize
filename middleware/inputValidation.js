const Joi = require("joi");

const inputValidate = (schema) => {
    return (req, res, next) => {
        const method = req.method
        if (method === 'PUT') {
            const { id } = req.params;
            const idSchema = Joi.number().integer().required()
            const idValidate = idSchema.validate(id);
            console.log(idValidate)
            if (idValidate.error) {
                console.error(idValidate.error.message);
                return res.status(400).json({ error: 'Bad request' });
            }
            const { error } = schema.validate(req.body);
            if (error) {
                console.error(error.message);
                return res.status(400).json({ error: 'Bad request' })
            }
            next();
        } else {
            const { error } = schema.validate(req.body);
            if (error) {
                console.error(error.message);
                return res.status(400).json({ error: 'Bad request' })
            }
            next();
        }
    }
}

module.exports = { inputValidate }