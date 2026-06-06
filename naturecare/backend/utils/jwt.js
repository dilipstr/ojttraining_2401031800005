const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret_key_here_change_in_production', {
    expiresIn: '7d',
  });
};

module.exports = { generateToken };
