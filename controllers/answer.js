const { where } = require('sequelize');
const db = require('../models/index');
const { addAnswerSchema } = require('../validationSchema/questionValidateSchema');
const { Question, Student, Answer } = db;

const addAnswer = async (req, res) => {
    try {
        const inputValidate = await addAnswerSchema.validateAsync(req.body);
        const { answer, Question_Id, Student_Id } = inputValidate;
        const existStudent = await Student.findOne({
            where: { id: Student_Id }
        })
        if (existStudent) {
            const existQuestion = await Question.findOne({
                where: { id: Question_Id }
            })
            if (existQuestion) {
                const addedAnswer = await Answer.create({ Answer: answer, Question_Id, Student_Id });
                if (addedAnswer) {
                    return res.status(201).json({ message: "Answer added successfully" })
                } else {
                    return res.status(400).json({ message: "Answer not added " })
                }
            } else {
                return res.status(404).json({ error: "This question does not exist" })
            }
        } else {
            return res.status(404).json({ error: "This student does not exist" })
        }
    } catch (error) {
        console.error(error.message);
        if (error.isJoi === true) {
            return res.status(422).json({ error: error.message })
        }
        res.status(500).json({ error: error })
    }

}

module.exports = { addAnswer }