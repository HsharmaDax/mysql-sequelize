const express = require('express');
const { insertAddress, updateAddress, deleteAddress } = require('../controllers/addressController');
const { addressInputValidate, addressUpdateValidate } = require('../middleware/addressValidation');
const router = express.Router();


router.post('/insert', addressInputValidate, insertAddress);

router.put('/update/:id', addressUpdateValidate, updateAddress)

router.delete('/delete/:id', deleteAddress)

module.exports = router;