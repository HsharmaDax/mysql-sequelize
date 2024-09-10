
const inputValidate = (schema) => {
    return (req, res, next) => {
        const {id} = req.params;
        if (id) {
            data = {
                id: parseInt(id), ...req.body
            }
            const { error } = schema.validate(data);
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