const { Op, where } = require('sequelize');
const db = require('../models/index');
const { addStudent, editStudent, removeStudent } = require('../modularGenerator/studentModular');
const { Student, Address, Course } = db;

const insertStudent = async (req, res) => {
    try {
        const { Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id } = req.body;
        const existStudent = await Student.findOne({
            where: { Email: Email }, paranoid: false
        })
        if (existStudent) {
            return res.status(409).json({ error: 'Student with this email already exist' })
        }
        const student = await addStudent({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id })
        if (student) {
            return res.status(201).json({ message: "Student Added" });
        } else {
            return res.status(500).json({ message: "Some error occured" })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: error });
    }
}

const updateStudent = async (req, res) => {
    const studentId = req.params.id;
    const { Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id } = req.body;
    try {
        const existStudent = await Student.findOne({
            where: { id: studentId }
        })
        if (existStudent) {
            const updatedStudent = await editStudent({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id, studentId })
            if (updatedStudent > 0) {
                return res.status(200).json({ message: "Student updated" })
            } else {
                return res.status(500).json({ message: "Error updating student" })
            }
        } else {
            return res.status(404).json({ message: "Student not found" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteStudent = async (req, res) => {
    const studentId = req.params.id;
    try {
        const existStudent = await Student.findOne({
            where: { id: studentId }
        })
        if (existStudent) {
            const deletedStudent = await removeStudent(studentId)
            if (deletedStudent > 0) {
                return res.status(204).send();
            } else {
                return res.status(500).json({ message: 'Some error occured' })
            }
        }
        else {
            return res.status(404).json({ error: 'Student not found' });
        }
    } catch (error) {
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
        res.status(500).json(error);
    }
}

const studentWithCourses = async (req, res) => {
    try {
        const allStudents = await Student.findAll({
            attributes: ['Name', 'Email'],
            include: {
                model: Course,
                attributes: ['Course_Name', 'Fee', 'Min_Year', 'Max_Year', 'Eligibility', 'Category'],
                required: false
            }
        });
        if (allStudents) {
            return res.status(200).json(allStudents);
        } else {
            return res.status(404).json({ message: "No student found" })
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}

const allStudentandAddress = async (req, res) => {
    try {
        const allStudents = await Student.findAll({
            attributes: ['Name', 'Email', 'DOB', 'Father_Name', 'Gender'],
            include: {
                model: Address,
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
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}

const studentWithNoAddress = async (req, res) => {
    try {
        const studentsWithOutAddresses = await Student.findAll({
            attributes: ['Name', 'Email', 'DOB', 'Father_Name', 'Gender', 'Course_Id'],
            include: {
                model: Address,
                attributes: [],
                required: false
            }, where: {
                Address_Id: null
            }
        });
        if (studentsWithOutAddresses) {
            return res.status(200).json(studentsWithOutAddresses);
        } else {
            return res.status(404).json({ message: "No student found" })
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}

const studentWithAddress = async (req, res) => {
    try {
        const studentsWithAddresses = await Student.findAll({
            attributes: ['Name', 'Email', 'DOB', 'Father_Name', 'Gender'],
            include: {
                model: Address,
                attributes: ['House_No', 'Pin', 'City', 'State', 'Country'],
                required: true
            }, where: {
                Address_Id: { [Op.ne]: null }
            }
        });
        if (studentsWithAddresses) {
            return res.status(200).json(studentsWithAddresses);
        } else {
            return res.status(404).json({ message: "No student found" })
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching data.' });
    }
}

module.exports = { insertStudent, updateStudent, deleteStudent, allStudentandAddress, deletedStudents, studentWithCourses, studentWithNoAddress, studentWithAddress }