const express = require('express');
const router = express.Router();
const emailService = require('../services/emailService');

router.post('/test', async (req, res) => {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }
    const result = await emailService.sendTestEmail(email);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
