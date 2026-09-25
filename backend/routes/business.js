// PLACEHOLDER: the business routes have not been built yet.
const express = require('express');
const router = express.Router();

router.all('*', (req, res) => {
  res.status(501).json({ message: 'Business API not implemented yet' });
});

module.exports = router;
