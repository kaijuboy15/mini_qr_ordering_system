const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;