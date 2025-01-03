const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { identifier, password } = req.body; // Identifier can be email or nickname (Admin)

  try {
    // Check if user exists in Users table
    const userResult = await pool.query(
      'SELECT * FROM Users WHERE email = $1 OR user_id = $1',
      [identifier]
    );

    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = userResult.rows[0];

    // Verify Password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the user is Admin
    const adminResult = await pool.query('SELECT * FROM Admin WHERE user_id = $1', [user.user_id]);
    const isAdmin = adminResult.rows.length > 0;

    // Generate JWT Token
    const token = jwt.sign(
      {
        userId: user.user_id,
        role: isAdmin ? 'admin' : 'user',
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role: isAdmin ? 'admin' : 'user' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerUser = async (req, res) => {
  const { email, password, forename, surname, notification_preference } = req.body;

  try {
    // Check if email already exists
    const emailCheck = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert User
    const userResult = await pool.query(
      'INSERT INTO Users (email, password) VALUES ($1, $2) RETURNING user_id',
      [email, hashedPassword]
    );

    const userId = userResult.rows[0].user_id;

    // Insert into Buyer table
    await pool.query(
      'INSERT INTO Buyer (user_id, forename, surname, notification_preference) VALUES ($1, $2, $3, $4)',
      [userId, forename, surname, notification_preference]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
