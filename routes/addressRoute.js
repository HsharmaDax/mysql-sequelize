const express = require('express');
const { insertAddress, updateAddress, deleteAddress } = require('../controllers/addressController');
const { inputValidate } = require('../middleware/inputValidation');
const { addressSchema, updateAddressSchema } = require('../validationSchema/addressValidationSchema');
const router = express.Router();


router.post('/insert', inputValidate(addressSchema), insertAddress);

router.put('/update/:id', inputValidate(updateAddressSchema), updateAddress)

router.delete('/delete/:id', deleteAddress)

module.exports = router;