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
            return res.status(409).json({ error: 'This course data already added !!' })
        }
        const addedCourse = await addCourse({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category });
        if (addedCourse > 0) {
            return res.status(201).json({ message: 'Course added' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const existCourse = await Course.findOne({
            where: { id: courseId }
        })
        if (existCourse) {
            const { Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category } = req.body;
            const updatedCourse = await editCourse({ Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category, courseId })
            if (updatedCourse > 0) {
                return res.status(200).json({ message: "Course updated Successfully" })
            }
        } else {
            return res.status(404).json("Course not found")
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error'})
    }
}

const deleteCourse = async (req, res) => {
    const courseId = req.params.id;
    try {
        const deletedCourse = await removeCourse(courseId);
        if (deletedCourse > 0) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
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
        return res.status(500).json({ message: error })
    }
}

module.exports = { insertCourse, updateCourse, deleteCourse, allCoursesWithStudents }