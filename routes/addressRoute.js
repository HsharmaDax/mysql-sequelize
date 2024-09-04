const express = require('express');
const { insertAddress, updateAddress, deleteAddress } = require('../controllers/addressController');
const router = express.Router();


router.post('/insert', insertAddress);

router.put('/update/:id', updateAddress)

router.delete('/delete/:id', deleteAddress)

module.exports = router;