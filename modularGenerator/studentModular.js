const db = require('../models/index');
const { Student } = db;

const addStudent = async ({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id }) => {
    try {
        const studentAdded = await Student.create({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id });
        return studentAdded;
    } catch (error) {
        console.log(error)
    }
}

const editStudent = async ({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id, studentId }) => {
    try {
        const studentUpdated = await Student.update({
            Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id
        }, {
            where: { id: studentId }
        });
        return studentUpdated;
    } catch (error) {
        console.log(error)
    }
}

const removeStudent = async (studentId) => {
    try {
        const studentDeleted = await Student.destroy({
            where: { id: studentId }
        });
        return studentDeleted;
    } catch (error) {
        console.log(error)
    }
}


module.exports = { addStudent, editStudent, removeStudent }