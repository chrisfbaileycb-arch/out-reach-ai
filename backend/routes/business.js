const express = require('express');
const { User, Business } = require('../models');
const requireAuth = require('../middleware/auth');
const BUSINESS_TYPES = require('../config/businessTypes');

const router = express.Router();
router.use(requireAuth);

// Set the signed-in owner's business type, creating their business the first time
router.put('/me', async (req, res) => {
  try {
    const { type } = req.body;
    if (!BUSINESS_TYPES.includes(type)) {
      return res.status(400).json({ message: 'Unknown business type' });
    }
    if (!(await User.exists({ _id: req.userId }))) {
      return res.status(401).json({ message: 'Session expired. Please sign in again.' });
    }

    const business = await Business.findOneAndUpdate(
      { owner: req.userId },
      { type },
      { new: true, upsert: true, runValidators: true }
    );
    await User.updateOne({ _id: req.userId }, { business: business._id });

    res.json({ businessType: business.type });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PLACEHOLDER: the rest of the business API has not been built yet.
router.all('*', (req, res) => {
  res.status(501).json({ message: 'Business API not implemented yet' });
});

module.exports = router;
