const express = require('express');
const { addVehicle, getVehicles } = require('../controllers/vehicleController');
const { authenticateUser } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticateUser, addVehicle);
router.get('/', getVehicles);

module.exports = router;
