const express = require('express');
const router = express.Router();
const { updateStudent, insertStudent, deleteStudent, allStudentandAddress, deletedStudents, studentWithCourses, studentWithNoAddress, studentWithAddress } = require('../controllers/studentController');
const { inputValidate } = require('../middleware/courseValidation');
const { studentSchema, updateStudentSchema } = require('../validationSchema/studentValidationSchema');
const idSchema = require('../validationSchema/idValidationSchema');

router.post('/insert', inputValidate(studentSchema), insertStudent);

router.put('/update/:id', inputValidate(updateStudentSchema , idSchema) , updateStudent);

router.delete('/delete/:id', deleteStudent)

router.get('/students', allStudentandAddress);

router.get('/deletedstudents', deletedStudents);

router.get('/studentswithcourse', studentWithCourses);

router.get('/noaddress', studentWithNoAddress);

router.get('/address', studentWithAddress);

module.exports = router;