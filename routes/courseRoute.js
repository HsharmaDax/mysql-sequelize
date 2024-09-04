const express = require('express');
const { insertCourse, updateCourse, deleteCourse, allCoursesWithStudents } = require('../controllers/courseController');
const router = express.Router();


router.post('/insert',insertCourse );

router.put('/update/:id', updateCourse);

router.delete('/delete/:id',deleteCourse );

router.get('/allcoursewithstudent', allCoursesWithStudents)

module.exports = router;