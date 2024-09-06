const express = require('express');
const router = express.Router();
const { updateStudent, insertStudent, deleteStudent, allStudentandAddress, deletedStudents, studentWithCourses, studentWithNoAddress, studentWithAddress } = require('../controllers/studentController');
const { studentInputValidate, studentUpdateValidate } = require('../middleware/studentValidation');

router.post('/insert', studentInputValidate, insertStudent);

router.put('/update/:id', studentUpdateValidate , updateStudent);

router.delete('/delete/:id', deleteStudent)

router.get('/students', allStudentandAddress);

router.get('/deletedstudents', deletedStudents);

router.get('/studentswithcourse', studentWithCourses);

router.get('/noaddress', studentWithNoAddress);

router.get('/address', studentWithAddress);

module.exports = router;