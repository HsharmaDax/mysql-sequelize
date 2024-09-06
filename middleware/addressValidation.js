const { addressSchema, updateAddressSchema } = require("../validationSchema/validateSchema")


const addressInputValidate = async (req, res, next) => {
    const { error } = addressSchema.validate(req.body);
    if (error) {
        console.error(error.message);
        return res.status(422).json(error.message)
    }
    next();
}

const addressUpdateValidate = async (req, res, next) => {
    const { error } = updateAddressSchema.validate(req.body);
    if (error) {
        console.error(error.message);
        return res.status(422).json(error.message)
    }
    next();
}

module.exports = { addressInputValidate, addressUpdateValidate }