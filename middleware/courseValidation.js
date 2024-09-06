const { updateCourseSchema, courseSchema } = require("../validationSchema/validateSchema")


const courseInputValidate = (req, res, next) => {
    const { error } = courseSchema.validate(req.body);
    if (error) {
        console.error(error.message);
        return res.status(422).json(error.message)
    }
    next();
}

const courseUpdateValidate = async (req, res, next) => {
    const { error } = updateCourseSchema.validate(req.body);
    if (error) {
        console.error(error.message);
        return res.status(422).json(error.message)
    }
    next();
}

module.exports = { courseInputValidate, courseUpdateValidate }