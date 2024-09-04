const express = require('express');
const router = express.Router();
const { UpdateStudent, InsertStudent, DeleteStudent, AllStudentandAddress, DeletedStudents, StudentWithCourses, StudentWithNoAddress, StudentWithAddress } = require('../controllers/studentController');

router.post('/insert', InsertStudent);

router.put('/update/:id', UpdateStudent);

router.delete('/delete/:id', DeleteStudent)

router.get('/students', AllStudentandAddress);

router.get('/deletedstudents', DeletedStudents);

router.get('/studentswithcourse', StudentWithCourses);

router.get('/noaddress', StudentWithNoAddress);

router.get('/address', StudentWithAddress);

module.exports = router;