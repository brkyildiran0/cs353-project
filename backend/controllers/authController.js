const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO Users (email, password) VALUES ($1, $2) RETURNING user_id',
      [email, hashedPassword]
    );

    if (userType === 'admin') {
      await pool.query('INSERT INTO Admin (user_id, nickname) VALUES ($1, $2)', [
        result.rows[0].user_id,
        'admin_' + result.rows[0].user_id,
      ]);
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ message: 'Invalid credentials' });

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.rows[0].user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
