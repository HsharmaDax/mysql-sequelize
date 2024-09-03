const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { where } = require('sequelize');
const { Student , Courses ,Addresses} = db;

router.post('/insert', async (req, res) => {
    const { Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id } = req.body;
    try {
        if (!Name || !Email || !Father_Name || !DOB || !Gender || !Course_Id) {
            return res.status(400).json({ error: 'Enter Complete Address' });
        }
        const existStudent = await Student.findOne({
            where: { Email: Email }
        })
        if (existStudent) {
            console.log('Email already registered')
            return res.status(400).json({ error: 'Student with this email already exist' })
        }
        const student = await Student.create({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id });
        res.status(201).json(student);
    } catch (error) {
        console.log('Error adding student:', error);
        res.status(500).json({ error: error });
    }
});

router.put('/update/:id', async (req, res) => {
    const studentId = req.params.id;
    const { Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id } = req.body;
    try {
        if (!Name && !Email && !Father_Name && !DOB && !Gender && !Course_Id) {
            return res.status(400).json({ error: 'Nothing to update' });
        }
        const student = await Student.findOne({ where: { id: studentId } });
        if (!student) {
            return res.status(404).json({ error: 'Student not found' })
        }
        const updateStudent = await Student.update({
            Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id
        }, {
            where: { id: studentId }
        })
        console.log("Student Updated Successfully");
        return res.status(200).json({ message: "Student Updated Successfully" })
    } catch (error) {
        console.log('Error updating Course :', error);
        return res.status(500).json({ error: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const DeleteStudent = await Student.destroy({
            where: { id: studentId }
        });
        if (DeleteStudent) {
            res.status(200).json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.log('Error deleting Student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/students', async (req, res) => {
    try {
        const allStudents = await Student.findAll({
            attributes: ['Name', 'Email', 'DOB', 'Father_Name', 'Gender'],
            include: {
                model: Addresses,
                attributes: ['House_No', 'Pin', 'City', 'State', 'Country'],
                required: false
            }
        });
        res.json(allStudents);
    } catch (error) {
        console.error('Error fetching students with addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

router.get('/studentswithcourse', async (req, res) => {
    try {
        const allStudents = await Student.findAll({
            attributes: ['Name', 'Email'],
            include: {
                model: Courses,
                attributes: ['Course_Name', 'Fee', 'Min_Year', 'Max_Year', 'Eligibility', 'Category'],
                required: false
            }
        });
        res.json(allStudents);
    } catch (error) {
        console.error('Error fetching students with addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

router.get('/noaddress', async (req, res) => {
    try {
        const studentsWithOutAddresses = await Student.findAll({
            attributes: ['Name', 'Email', 'DOB', 'Father_Name', 'Gender'],
            include: {
                model: Addresses,
                attributes: [],
                required: false
            }, where:{
                Address_Id: null
            }
        });
        res.json(studentsWithOutAddresses);
    } catch (error) {
        console.error('Error fetching students without addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

router.get('/address', async (req, res) => {
    try {
        const studentsWithAddresses = await Student.findAll({
            attributes: ['Name', 'Email', 'DOB', 'Father_Name', 'Gender'],
            include: {
                model: Addresses,
                attributes: ['House_No', 'Pin', 'City', 'State', 'Country'],
                required: false
            }, where:{
                Address_Id: !null
            }
        });
        res.json(studentsWithAddresses);
    } catch (error) {
        console.error('Error fetching students without addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
});

module.exports = router;