const { Op } = require('sequelize');
const db = require('../models/index');
const { studentSchema } = require('./validateSchema');
const { Student, Addresses, Courses } = db;

const insertStudent = async (req, res) => {
    try {
        const inputValidate = await studentSchema.validateAsync(req.body);
        const existStudent = await Student.findOne({
            where: { Email: inputValidate.Email }
        })
        const { Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id } = inputValidate;
        if (existStudent) {
            console.log('Email already registered')
            return res.status(409).json({ error: 'Student with this email already exist' })
        }
        const student = await Student.create({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id });
        if (student) {
            console.log('Student Added', student);
            return res.status(201).json(student);
        }
    } catch (error) {
        console.log('Error adding student:', error);
        if (error.isJoi === true) {
            return res.status(422).json({ error: error.message })
        }
        res.json({ error: error });
    }
}

const updateStudent = async (req, res) => {
    const studentId = req.params.id;
    try {
        const inputUpdateValidation = await updateCourseSchema.validateAsync(req.body);
        const { Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id } = inputUpdateValidation;
        const updatedStudent = await Student.update({
            Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id
        }, {
            where: { id: studentId }
        })
        if (updatedStudent) {
            console.log("Student Updated Successfully");
            return res.status(200).json(updatedStudent)
        } else {
            console.log("Student not Updated ");
            return res.status(404).json({ message: "Student not Found" })
        }
    } catch (error) {
        console.log('Error updating Course :', error);
        if (error.isJoi === true) {
            return res.status(422).json({ error: error.message })
        }
        return res.status(500).json({ error: error.message })
    }
}

const deleteStudent = async (req, res) => {
    const studentId = req.params.id;
    try {
        const deletedStudent = await Student.destroy({
            where: { id: studentId }
        });
        if (deletedStudent) {
            res.status(204).json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
        console.log('Error deleting Student:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const deletedStudents = async (req, res) => {
    try {
        const allDeletedStudents = await Student.findAll({
            where: {
                deletedAt: {
                    [Op.ne]: null
                }
            }, paranoid: false
        });
        if (allDeletedStudents) {
            res.status(200).json(allDeletedStudents);
        } else {
            res.status(404).json({ message: "No student found" })
        }
    } catch (error) {
        console.error('Error fetching deleted students:', error);
        res.status(500).json(error);
    }
}

const studentWithCourses = async (req, res) => {
    try {
        const allStudents = await Student.findAll({
            attributes: ['Name', 'Email'],
            include: {
                model: Courses,
                attributes: ['Course_Name', 'Fee', 'Min_Year', 'Max_Year', 'Eligibility', 'Category'],
                required: false
            }
        });
        if (allStudents) {
            console.log(allStudents);
            return res.status(200).json(allStudents);
        } else {
            return res.status(404).json({ message: "No student found" })
        }
    } catch (error) {
        console.error('Error fetching students with addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}

const allStudentandAddress = async (req, res) => {
    try {
        const allStudents = await Student.findAll({
            attributes: ['Name', 'Email', 'DOB', 'Father_Name', 'Gender'],
            include: {
                model: Addresses,
                attributes: ['House_No', 'Pin', 'City', 'State', 'Country'],
                required: false
            }
        });
        if (allStudents) {
            return res.status(200).json(allStudents);
        } else {
            return res.status(404).json({ message: "No student found" })
        }
    } catch (error) {
        console.error('Error fetching students with addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}

const studentWithNoAddress = async (req, res) => {
    try {
        const studentsWithOutAddresses = await Student.findAll({
            attributes: ['Name', 'Email', 'DOB', 'Father_Name', 'Gender', 'Course_Id'],
            include: {
                model: Addresses,
                attributes: [],
                required: false
            }, where: {
                Address_Id: null
            }
        });
        if (studentsWithOutAddresses) {
            console.log(studentsWithOutAddresses);
            return res.status(200).json(studentsWithOutAddresses);
        } else {
            return res.status(404).json({ message: "No student found" })
        }
    } catch (error) {
        console.error('Error fetching students without addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}

const studentWithAddress = async (req, res) => {
    try {
        const studentsWithAddresses = await Student.findAll({
            attributes: ['Name', 'Email', 'DOB', 'Father_Name', 'Gender'],
            include: {
                model: Addresses,
                attributes: ['House_No', 'Pin', 'City', 'State', 'Country'],
                required: true
            }, where: {
                Address_Id: { [Op.ne]: null }
            }
        });
        if (studentsWithAddresses) {
            console.log(studentsWithAddresses);
            return res.status(200).json(studentsWithAddresses);
        } else {
            return res.status(404).json({ message: "No student found" })
        }
    } catch (error) {
        console.error('Error fetching students without addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}

module.exports = { insertStudent, updateStudent, deleteStudent, allStudentandAddress, deletedStudents, studentWithCourses, studentWithNoAddress, studentWithAddress }