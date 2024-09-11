const express = require('express');
const { insertCourse, updateCourse, deleteCourse, allCoursesWithStudents } = require('../controllers/courseController');
const { inputValidate } = require('../middleware/inputValidation');
const { updateCourseSchema, courseSchema } = require("../validationSchema/courseValidationSchema");
const paramSchema = require('../validationSchema/paramSchema');
const router = express.Router();


router.post('/insert', inputValidate(courseSchema), insertCourse);

router.put('/update/:id', inputValidate(updateCourseSchema, paramSchema), updateCourse);

router.delete('/delete/:id', inputValidate(paramSchema),deleteCourse);

router.get('/allcoursewithstudent', allCoursesWithStudents)

module.exports = router;