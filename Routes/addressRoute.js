const express = require('express');
const router = express.Router();
const db = require('../models/index');
const { Addresses } = db;

router.post('/insert', async (req, res) => {
    const { House_No, Pin, City, State, Country } = req.body;
    try {
        if (!House_No || !Pin || !City || !State || !Country) {
            return res.status(400).json({ error: 'Enter Complete Address' });
        }
        const address = await Addresses.create({ House_No, Pin, City, State, Country });
        res.status(201).json(address);
    } catch (error) {
        console.error('Error adding address to db:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    const addressId = req.params.id;
    const { House_No, Pin, City, State, Country } = req.body;
    try {
        if (!House_No && !Pin && !City && !State && !Country) {
            return res.status(400).json({ error: 'Nothing to update' });
        }
        const updateAddress = await Addresses.update({
            House_No, Pin, City, State, Country
        }, {
            where: { id: addressId }
        })
        if (updateAddress) {
            console.log("Address Updated");
            return res.status(200).json("Address Updated Successfully");
        } else {
            return res.status(400).json("Address not updated")
        }
    } catch (error) {
        console.log('Error updating address :', error);
        return res.status(500).json({ error: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    const addressId = req.params.id;
    try {
        const DeleteAddress = await Addresses.destroy({
            where: { id: addressId }
        })
        if (DeleteAddress) {
            res.status(200).json({ message: 'Address deleted successfully' });
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (error) {
        console.log('Error deleting Address:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;