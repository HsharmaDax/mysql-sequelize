const express = require('express');
const router = express.Router();
const { updateStudent, insertStudent, deleteStudent, allStudentandAddress, deletedStudents, studentWithCourses, studentWithNoAddress, studentWithAddress } = require('../controllers/studentController');

router.post('/insert', insertStudent);

router.put('/update/:id', updateStudent);

router.delete('/delete/:id', deleteStudent)

router.get('/students', allStudentandAddress);

router.get('/deletedstudents', deletedStudents);

router.get('/studentswithcourse', studentWithCourses);

router.get('/noaddress', studentWithNoAddress);

router.get('/address', studentWithAddress);

module.exports = router;