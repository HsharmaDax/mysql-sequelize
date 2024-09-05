const express = require('express');
const { addQuestion } = require('../controllers/question');
const { addAnswer } = require('../controllers/answer');
const router = express.Router();

router.post('/addquestion', addQuestion);

router.post('/addAnswer', addAnswer);


module.exports = router