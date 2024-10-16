const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { transactionSchema } = require('../validationSchema/transactionValidateSchema');
const { inputValidate } = require('../middleware/inputValidation');
const { Student, Address } = db;

router.post('/addAddressandStudent', inputValidate(transactionSchema), async (req, res) => {
    const transaction = await db.sequelize.transaction();
    const { Name, Email, DOB, Father_Name, Gender, Course_Id, House_No, Pin, City, State, Country } = req.body;
    try {
        const address = await Address.create({ House_No, Pin, City, State, Country }, { transaction });
        if (!address) {
            await transaction.rollback();
            return res.status(500).json({ message: 'Something went wrong' })
        }
        const Address_Id = address.id;
        const student = await Student.create({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id }, { transaction });
        if (!student) {
            await transaction.rollback();
            return res.status(500).json({ message: 'Something went wrong' })
        }
        await transaction.commit();
        return res.status(200).json('User added', student, address)
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: error.message })
    }
})

router.post('/addupdatedtransaction', async (req, res) => {
    const transaction = await db.sequelize.transaction();
    const { House_No, Pin, City, State, Country, Email } = req.body;
    try {
        const address = await Address.create({ House_No, Pin, City, State, Country }, { transaction });
        if (!address) {
            await transaction.rollback();
            return res.status(500).json({ message: 'Something went wrong' })
        }
        console.log(address)
        const Address_id = address.id;
        const studentUpdated = await Student.update({
            Address_Id: Address_id
        }, {
            where: { Email: Email }, transaction: transaction
        });
        console.log(studentUpdated)
        if (studentUpdated === 0) {
            await transaction.rollback();
            return res.status(500).json({ message: 'Something went wrong' })
        }
        await transaction.commit();
        return res.status(200).json({ StudentUpdated: studentUpdated, address: address })
    } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: error })
    }
})

module.exports = router