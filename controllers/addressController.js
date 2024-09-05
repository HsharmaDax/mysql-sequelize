const db = require('../models/index');
const { Addresses } = db;
const { addressSchema, updateAddressSchema } = require('./validateSchema')

const insertAddress = async (req, res) => {
    try {
        const inputValidate = await addressSchema.validateAsync(req.body);
        const { House_No, Pin, City, State, Country } = inputValidate;
        const address = await Addresses.create({ House_No, Pin, City, State, Country });
        if (address) {
            return res.status(201).json(address);
        }
    } catch (error) {
        console.error('Error adding address to db:', error);
        if (error.isJoi === true) {
            return res.status(422).json({ error: error.message })
        }
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const updateAddress = async (req, res) => {
    const addressId = req.params.id;
    try {
        const inputUpdateValidation = await updateAddressSchema.validateAsync(req.body);
        const { House_No, Pin, City, State, Country } = inputUpdateValidation;
        const updatedAddress = await Addresses.update({
            House_No, Pin, City, State, Country
        }, {
            where: { id: addressId }
        })
        if (updatedAddress) {
            console.log("Address Updated");
            res.status(200).json("Address Updated Successfully");
        } else {
            res.status(404).json("Address not found")
        }
    } catch (error) {
        console.log('Error updating address :', error);
        if (error.isJoi === true) {
            return res.status(422).json({ error: error.message })
        }
        return res.status(500).json({ error: error.message })
    }
}

const deleteAddress = async (req, res) => {
    const addressId = req.params.id;
    try {
        const deletedAddress = await Addresses.destroy({
            where: { id: addressId }
        })
        if (deletedAddress) {
            res.status(204).json({ message: 'Address deleted successfully' });
        } else {
            res.status(404).json({ error: 'Address not found' });
        }
    } catch (error) {
        console.log('Error deleting Address:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = { insertAddress, updateAddress, deleteAddress }