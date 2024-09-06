
const inputValidate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            console.error(error.message);
            return res.status(422).json(error.message)
        }
        next();
    }
}

module.exports = { inputValidate }