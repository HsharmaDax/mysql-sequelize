const db = require('../models/index');
const { Address } = db;

const addAddress = async ({ House_No, Pin, City, State, Country }) => {
    try {
        const addressCreated = await Address.create({ House_No, Pin, City, State, Country });
        console.log(addressCreated)
        return addressCreated;
    } catch (error) {
        console.error("Error creating address:", error.message);
        return res.status(400).json(error)
    }
}

const editAddress = async ({ House_No, Pin, City, State, Country, addressId }) => {
    try {
        const addressUpdated = await Address.update({
            House_No, Pin, City, State, Country
        }, {
            where: { id: addressId }
        })
        return addressUpdated;
    } catch (error) {
        console.error("Error creating address:", error.message);
        return res.status(400).json(error)
    }
}

const removeAddress = async (addressId) => {
    try {
        const addressDeleted = await Address.destroy({
            where: { id: addressId }
        })
        return addressDeleted;
    } catch (error) {
        console.error("Error creating address:", error.message);
        return res.status(400).json(error)
    }
}

module.exports = { addAddress, editAddress, removeAddress }