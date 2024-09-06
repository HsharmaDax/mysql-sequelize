
const inputValidate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            console.error(error.message);
            return res.status(400).json({error: 'Input data type is not correct'})
        }
        next();
    }
}

module.exports = { inputValidate }