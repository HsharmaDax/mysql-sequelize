const db = require('../models/index');
const { addQuestionSchema } = require('../validationSchema/questionValidateSchema');
const { Question, Student } = db;

const addQuestion = async (req, res) => {
    try {
        const inputValidate = await addQuestionSchema.validateAsync(req.body);
        const { question, Student_Id } = inputValidate;
        const existStudent = await Student.findOne({ where: { id: Student_Id } });
        if (existStudent) {
            const addedQuestion = await Question.create({ Question: question, Student_Id });
            if (addedQuestion) {
                return res.status(202).json({ message: "Question added successfully" })
            }
            return res.status(400).json({ error: 'Question not added' })
        } else {
            return res.status(404).json("This student id doesn't exist")
        }
    } catch (error) {
        console.error('Error adding address to db:', error);
        if (error.isJoi === true) {
            return res.status(422).json({ error: error.message })
        }
        res.status(500).json(error)
    }
}

module.exports = { addQuestion }