const db = require('../models/index');
const { Addresses } = db;

const insertAddress = async (req, res) => {
    const { House_No, Pin, City, State, Country } = req.body;
    try {
        if (!House_No || !Pin || !City || !State || !Country) {
            return res.status(400).json({ error: 'Enter Complete Address' });
        }
        const address = await Addresses.create({ House_No, Pin, City, State, Country });
        if (address) {
            return res.status(201).json(address);
        }
    } catch (error) {
        console.error('Error adding address to db:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateAddress = async (req, res) => {
    const addressId = req.params.id;
    const { House_No, Pin, City, State, Country } = req.body;
    try {
        if (!House_No && !Pin && !City && !State && !Country) {
            return res.status(400).json({ error: 'Nothing to update' });
        }
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