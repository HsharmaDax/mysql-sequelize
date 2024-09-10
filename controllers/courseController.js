const db = require('../models/index')
const { Course, Student } = db;
const { addCourse, editCourse, removeCourse } = require('../modularGenerator/courseModular');

const insertCourse = async (req, res) => {
    try {
        const { Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category } = req.body;
        const existCourse = await Course.findOne({
            where: { Course_Name: Course_Name }
        })
        if (existCourse) {
            console.log('Course already added')
            return res.status(409).json({ error: 'This course data already added !!' })
        }
        const addedCourse = await addCourse({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category });
        if (addedCourse) {
            console.log('Course added')
            return res.status(201).json('Course added');
        }
    } catch (error) {
        console.error('Error Inserting Course Data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const { Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category } = req.body;
        const updatedCourse = await editCourse({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category, courseId })
        if (updatedCourse) {
            console.log("Course Updated");
            return res.status(200).json("Course updated Successfully", updatedCourse)
        } else {
            console.log("Course not found");
            return res.status(404).json("Course not found")
        }
    } catch (error) {
        console.log('Error updating Course :', error)
        return res.status(500).json({ error: error.message })
    }
}

const deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const deletedCourse = await removeCourse(courseId)
        if (deletedCourse) {
            res.status(204).json({ message: 'Course deleted successfully' });
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
        const allCoursewithStudent = await Course.findAll({
            attribute: ['Course_Name', 'Fee', 'Min_Year', 'Max_Year', 'Eligibility', 'Category'],
            include: {
                model: Student,
                attributes: ['Name', 'Email'],
                required: false
            },
        })
        if (allCoursewithStudent) {
            res.status(200).json(allCoursewithStudent);
        } else {
            res.status(404).json({ message: 'No course found' })
        }
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({ message: error })
    }
}

module.exports = { insertCourse, updateCourse, deleteCourse, allCoursesWithStudents }