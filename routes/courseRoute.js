const express = require('express');
const { insertCourse, updateCourse, deleteCourse, allCoursesWithStudents } = require('../controllers/courseController');
const { courseInputValidate, courseUpdateValidate } = require('../middleware/courseValidation');
const router = express.Router();


router.post('/insert', courseInputValidate ,insertCourse );

router.put('/update/:id', courseUpdateValidate ,updateCourse);

router.delete('/delete/:id',deleteCourse );

router.get('/allcoursewithstudent', allCoursesWithStudents)

module.exports = router;