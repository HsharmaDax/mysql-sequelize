const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { transactionSchema } = require('../validationSchema/validateSchema');
const { Student, Addresses } = db;

router.post('/addAddressandStudent', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const inputValidate = await transactionSchema.validateAsync(req.body);
        const { Name, Email, DOB, Father_Name, Gender, Course_Id, House_No, Pin, City, State, Country } = inputValidate;
        const address = await Addresses.create({ House_No, Pin, City, State, Country }, { transaction });
        const Address_Id = address.id;
        const student = await Student.create({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id }, { transaction });
        await transaction.commit();
        return res.status(200).json('User added', student, address)
    } catch (error) {
        await transaction.rollback();
        console.log('Error message', error);
        if (error.isJoi === true) {
            return res.status(422).json({ error: error.message })
        }
        return res.status(500).json({ message: error.message })
    }
})


module.exports = router