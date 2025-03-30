import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const generateToken = (user) => {
  const payload = {
    first_name: user.first_name,
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    User.findById(decoded.id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        req.user = user; // Attach user to request object
        next();
      })
      .catch((error) => {
        console.error('Error verifying user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      });
  });
};

export default { generateToken, verifyToken };