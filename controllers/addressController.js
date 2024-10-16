const db = require('../models/index');
const { Address } = db;
const { addAddress, editAddress, removeAddress } = require('../modularGenerator/addressModular');

const insertAddress = async (req, res) => {
    try {
        const { House_No, Pin, City, State, Country } = req.body;
        const address = await addAddress({ House_No, Pin, City, State, Country })
        if (address) {
            return res.status(201).json({ message: 'Address added' });
        } else {
            return res.status(500).json({ message: "Error adding address" })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const updateAddress = async (req, res) => {
    const addressId = req.params.id;
    const { House_No, Pin, City, State, Country } = req.body;
    try {
        const existAddress = await Address.findOne({
            where: { id: addressId }
        })
        if (existAddress) {
            const updatedAddress = await editAddress({ House_No, Pin, City, State, Country, addressId })
            if (updatedAddress > 0) {
                res.status(200).json("Address Updated Successfully");
            } else {
                return res.status(500).json({ message: "Error updating address" })
            }
        } else {
            return res.status(404).json({ message: "Address not found" })
        }
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

const deleteAddress = async (req, res) => {
    const addressId = req.params.id;
    try {
        const existAddress = await Address.findOne({
            where: { id: addressId }
        })
        if (existAddress) {
            const deletedAddress = await removeAddress(addressId);
            if (deletedAddress > 0) {
                return res.status(204).send();
            } else {
                return res.status(400).json({ message: 'Address not found' })
            }
        } else {
            return res.status(404).json({ message: "Address not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { insertAddress, updateAddress, deleteAddress }