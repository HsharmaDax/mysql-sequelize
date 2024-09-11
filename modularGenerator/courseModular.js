const db = require('../models/index');
const { Course } = db;

const addCourse = async ({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category }) => {
    try {
        const courseCreated = await Course.create({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category });
        return courseCreated;
    } catch (error) {
        console.log(error)
    }
}

const editCourse = async ({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category, courseId }) => {
    try {
        const editedCourse = await Course.update({
            Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category
        }, { where: { id: courseId } });
        return editedCourse;
    } catch (error) {
        console.log(error)
    }
}

const removeCourse = async (courseId) => {
    try {
        const courseDeleted = await Course.destroy({
            where: { id: courseId }
        });
        return courseDeleted;
    } catch (error) {
        return res.status(400).json(error)
    }
}


module.exports = { addCourse, editCourse, removeCourse }