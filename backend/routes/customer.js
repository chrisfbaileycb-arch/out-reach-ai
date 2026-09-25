// PLACEHOLDER: the customer routes have not been built yet.
const express = require('express');
const router = express.Router();

router.all('*', (req, res) => {
  res.status(501).json({ message: 'Customer API not implemented yet' });
});

module.exports = router;
