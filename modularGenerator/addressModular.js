const db = require('../models/index');
const { Address } = db;

const addAddress = async ({ House_No, Pin, City, State, Country }) => {
    const addressCreated = await Address.create({ House_No, Pin, City, State, Country });
    return addressCreated;
}

module.exports = addAddress