const db = require('../models/index');
const { Course} = db;

const addCourse = async ({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category }) => {
    try {
        const courseCreated = await Course.create({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category });
        console.log(courseCreated)
        return courseCreated;
    } catch (error) {
        console.error("Error adding course:", error.message);
        return res.status(400).json(error)
    }
}

const editCourse = async ({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category, courseId }) => {
    try {
        const editedCourse = await Course.update({
            Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category
        }, { where: { id: courseId } });
        console.log(editedCourse)
        return editedCourse;
    } catch (error) {
        console.error("Error updating course:", error.message);
        return res.status(400).json(error)
    }
}

const removeCourse = async (courseId) => {
    try {
        const courseDeleted =  await Course.destroy({
            where: { id: courseId }
        });
        console.log(courseDeleted)
        return courseDeleted;
    } catch (error) {
        console.error("Error deleting course:", error.message);
        return res.status(400).json(error)
    }
}


module.exports = { addCourse, editCourse, removeCourse }