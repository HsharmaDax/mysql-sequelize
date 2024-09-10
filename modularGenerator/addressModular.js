const db = require('../models/index');
const { Address } = db;

const addAddress = async ({ House_No, Pin, City, State, Country }) => {
    try {
        const addressCreated = await Address.create({ House_No, Pin, City, State, Country });
        return addressCreated;
    } catch (error) {
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
        return res.status(400).json(error)
    }
}

module.exports = { addAddress, editAddress, removeAddress }