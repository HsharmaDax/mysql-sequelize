const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { where } = require('sequelize');
const { attribute } = require('@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/attribute.js');
const { Courses , Student} = db;

router.post('/insert', async (req, res) => {
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
        res.status(201).json(Course);
    } catch (error) {
        console.error('Error Inserting Course Data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    const courseId = req.params.id;
    const { Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category } = req.body;
    try {
        if (!Course_Name && !Fee && !Min_Year && !Eligibility && !Category) {
            return res.status(400).json({ error: 'Nothing to update' });
        }
        const course = await Courses.findAll({ where: { id: courseId } });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' })
        }
        const updateCourse = await Courses.update({
            Course_Name, Fee, Min_Year, Max_Year, Eligibility, Category
        }, { where: { id: courseId } })
        console.log("Course Updated");
        return res.status(200).json("Course updated Successfully")
    } catch (error) {
        console.log('Error updating Course :', error);
        return res.status(500).json({ error: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
        const DeleteCourse = await Courses.destroy({
            where: { id: courseId }
        });
        if (DeleteCourse) {
            res.status(200).json({ message: 'Course deleted successfully' });
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        console.log('Error deleting Course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/allcoursewithstudent', async(req,res)=>{
    try {
        const allCoursewithStudent = await Courses.findAll({
            attribute: ['Course_Name', 'Fee', 'Min_Year', 'Max_Year', 'Eligibility', 'Category'],
            include:{
                model:Student,
                attributes : ['Name', 'Email'],
                required: false
            },
        })
        res.json(allCoursewithStudent);
    } catch (error) {
        console.log('Error', error);
        return res.status(500).json({message: error})
    }
})

module.exports = router;