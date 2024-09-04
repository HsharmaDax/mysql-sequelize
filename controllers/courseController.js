const db = require('../models/index');
const { Courses, Student } = db;

const insertCourse = async (req, res) => {
    const { Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category } = req.body;
    try {
        if (!Course_Name || !Fee || !Min_Year || !Eligibility || !Category) {
            return res.status(400).json({ error: 'Enter Correct Infromation For Course' });
        }
        const existCourse = await Courses.findOne({
            where: { Course_Name: Course_Name }
        })
        if (existCourse) {
            console.log('Course already added')
            return res.status(400).json({ error: 'This course data already added !!' })
        }
        const Course = await Courses.create({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category });
        if (Course) {
            console.log('Course added')
            return res.status(200).json('Course added');
        }
    } catch (error) {
        console.error('Error Inserting Course Data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateCourse = async (req, res) => {
    const courseId = req.params.id;
    const { Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category } = req.body;
    try {
        if (!Course_Name && !Fee && !Min_Year && !Eligibility && !Category) {
            return res.status(400).json({ error: 'Nothing to update' });
        }
        const updatedCourse = await Courses.update({
            Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category
        }, { where: { id: courseId } })
        if (updatedCourse) {
            console.log("Course Updated");
            return res.status(200).json("Course updated Successfully", updatedCourse)
        } else {
            console.log("Course not found");
            return res.status(404).json("Course not found")
        }
    } catch (error) {
        console.log('Error updating Course :', error);
        return res.status(500).json({ error: error.message })
    }
}

const deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const deletedCourse = await Courses.destroy({
            where: { id: courseId }
        });
        if (deletedCourse) {
            res.status(200).json({ message: 'Course deleted successfully' });
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        console.log('Error deleting Course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const allCoursesWithStudents = async (req, res) => {
    try {
        const allCoursewithStudent = await Courses.findAll({
            attribute: ['Course_Name', 'Fee', 'Min_Year', 'Max_Year', 'Eligibility', 'Category'],
            include: {
                model: Student,
                attributes: ['Name', 'Email'],
                required: false
            },
        })
        res.status(200).json(allCoursewithStudent);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: error })
    }
}

module.exports = {insertCourse , updateCourse , deleteCourse , allCoursesWithStudents}