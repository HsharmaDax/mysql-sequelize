const express = require('express');
const { InsertCourse, UpdateCourse, DeleteCourse, AllCourseWithStudents } = require('../controllers/courseController');
const router = express.Router();


router.post('/insert',InsertCourse );

router.put('/update/:id', UpdateCourse);

router.delete('/delete/:id',DeleteCourse );

router.get('/allcoursewithstudent', AllCourseWithStudents)

module.exports = router;