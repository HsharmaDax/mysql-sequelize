const { studentSchema, updateStudentSchema } = require("../validationSchema/validateSchema")


const studentInputValidate = async (req, res, next) => {
    const { error } = studentSchema.validate(req.body);
    if (error) {
        console.error(error.message);
        return res.status(422).json(error.message)
    }
    next();
}

const studentUpdateValidate = async (req, res, next) => {
    const { error } = updateStudentSchema.validate(req.body);
    if (error) {
        console.error(error.message);
        return res.status(422).json(error.message)
    }
    next();
}

module.exports = { studentInputValidate, studentUpdateValidate }