
const inputValidate = (schema , id ) => {
    return (req, res, next) => {
        if(id){
            const {error : idError} = id.validate(req.params);
            if(idError){
                return res.status(400).json({ error: 'Bad request' })
            }
        }
        const { error } = schema.validate(req.body);
        if (error) {
            console.error(error.message);
            return res.status(400).json({ error: 'Bad request' })
        }
        next();
    }
}

module.exports = { inputValidate }