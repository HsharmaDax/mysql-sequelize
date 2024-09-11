const express = require('express');
const { insertAddress, updateAddress, deleteAddress } = require('../controllers/addressController');
const { inputValidate } = require('../middleware/inputValidation');
const { addressSchema, updateAddressSchema } = require('../validationSchema/addressValidationSchema');
const paramSchema = require('../validationSchema/paramSchema');
const router = express.Router();


router.post('/insert', inputValidate(addressSchema), insertAddress);

router.put('/update/:id', inputValidate(updateAddressSchema, paramSchema), updateAddress)

router.delete('/delete/:id',inputValidate(paramSchema), deleteAddress)

module.exports = router;