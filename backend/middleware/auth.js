const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if not token
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts !== 'Bearer') {
    return res.status(401).json({ msg: 'Token format is "Bearer <token>"' });
  }

  const token = tokenParts;

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Access denied. Not an admin.' });
  }
};

module.exports = { auth, isAdmin };