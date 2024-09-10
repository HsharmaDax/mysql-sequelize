const Joi = require("joi");

const inputValidate = (schema) => {
    return (req, res, next) => {
        const method = req.method
        if (method === 'PUT') {
            const data = req.params;
            const id = data.id;
            const idSchema = Joi.number().integer().required()
            const idValidate = idSchema.validate(id);
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
        } else if (method === 'GET') {
            // no validation condition for get method for now 
        }
        else if (method === 'POST') {
            const { error } = schema.validate(req.body);
            if (error) {
                console.error(error.message);
                return res.status(400).json({ error: 'Bad request' })
            }
            next();
        } else if (method === 'DELETE') {
            const data = req.params;
            const id = data.id;
            const idSchema = Joi.number().integer().required()
            const { error } = idSchema.validate(id);
            if (error) {
                console.error(error.message);
                return res.status(400).json({ error: 'Bad request' })
            }
            next();
        }
    }
}

module.exports = { inputValidate }