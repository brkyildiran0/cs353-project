const express = require('express');
const { createListing, getListings } = require('../controllers/listingController');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateUser, createListing);
router.get('/', getListings);

module.exports = router;
