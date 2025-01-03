const pool = require('../config/db');

exports.addVehicle = async (req, res) => {
  const { make, year, mileage, price, fuel_type, transmission, color, condition } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Vehicle (make, year, mileage, price, fuel_type, transmission, color, condition)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING vehicle_id`,
      [make, year, mileage, price, fuel_type, transmission, color, condition]
    );

    res.status(201).json({ vehicleId: result.rows[0].vehicle_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVehicles = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Vehicle');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
