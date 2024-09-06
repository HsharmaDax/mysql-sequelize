const express = require('express');
const { insertCourse, updateCourse, deleteCourse, allCoursesWithStudents } = require('../controllers/courseController');
const { inputValidate } = require('../middleware/courseValidation');
const { updateCourseSchema, courseSchema } = require("../validationSchema/validateSchema")
const router = express.Router();


router.post('/insert', inputValidate(courseSchema), insertCourse);

router.put('/update/:id', inputValidate(updateCourseSchema), updateCourse);

router.delete('/delete/:id', deleteCourse);

router.get('/allcoursewithstudent', allCoursesWithStudents)

module.exports = router;