const jwt = require('jsonwebtoken');

// Requires "Authorization: Bearer <token>" and sets req.userId
const requireAuth = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Not signed in' });
  }
  try {
    req.userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    next();
  } catch {
    res.status(401).json({ message: 'Session expired. Please sign in again.' });
  }
};

module.exports = requireAuth;
