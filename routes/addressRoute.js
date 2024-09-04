const express = require('express');
const { InsertAddress, UpdateAddress, DeleteAddress } = require('../controllers/addressController');
const router = express.Router();


router.post('/insert', InsertAddress);

router.put('/update/:id', UpdateAddress)

router.delete('/delete/:id', DeleteAddress)

module.exports = router;