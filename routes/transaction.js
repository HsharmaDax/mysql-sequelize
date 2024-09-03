const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Student, Addresses } = db;

router.post('/addAddressandStudent', async (req, res) => {
    const { Name, Email, DOB, Father_Name, Gender, Course_Id, House_No, Pin, City, State, Country } = req.body;
    const transaction = await db.sequelize.transaction();
    try {
        if (!Name || !Email || !Father_Name || !DOB || !Gender || !Course_Id, !House_No || !Pin || !City || !State || !Country) {
            return res.status(400).json({ error: 'Some fields are missing' });
        }
        const address = await Addresses.create({ House_No, Pin, City, State, Country }, { transaction });
        const Address_Id = address.id;
        const student = await Student.create({ Name, Email, DOB, Father_Name, Gender, Address_Id, Course_Id }, { transaction });
        await transaction.commit();
        return res.status(200).json('User added', student, address)
    } catch (error) {
        await transaction.rollback();
        console.log('Error message', error);
        return res.status(500).json({ message: error.message })
    }
})


module.exports = router