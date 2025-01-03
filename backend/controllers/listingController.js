const pool = require('../config/db');

exports.createListing = async (req, res) => {
  const { seller_id, title, description, vehicle_id, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Listing (seller_id, title, description, vehicle_id, status, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING listing_id`,
      [seller_id, title, description, vehicle_id, status]
    );

    res.status(201).json({ listingId: result.rows[0].listing_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Listing');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
