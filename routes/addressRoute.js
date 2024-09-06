const express = require('express');
const { insertAddress, updateAddress, deleteAddress } = require('../controllers/addressController');
const { inputValidate } = require('../middleware/courseValidation');
const { addressSchema, updateAddressSchema } = require('../validationSchema/addressValidationSchema');
const idSchema = require('../validationSchema/idValidationSchema');
const router = express.Router();


router.post('/insert', inputValidate(addressSchema), insertAddress);

router.put('/update/:id', inputValidate(updateAddressSchema , idSchema), updateAddress)

router.delete('/delete/:id', deleteAddress)

module.exports = router;