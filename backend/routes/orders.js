const express = require('express');
const router = express.Router();
const db = require('../db');

// GET /api/orders
router.get('/', (req, res) => {
  const sql = `
    SELECT o.order_id, o.total_amount, o.payment_status, o.created_at,
           oi.quantity, oi.unit_price,
           p.product_name, p.images
    FROM orders o
    JOIN order_items oi ON o.order_id = oi.order_id
    JOIN products p ON oi.product_id = p.product_id
    ORDER BY o.created_at DESC
  `;
  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// POST /api/orders
router.post('/', (req, res) => {
  const { total_amount, items } = req.body;

  db.query(
    'INSERT INTO orders (total_amount) VALUES (?)',
    [total_amount],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const order_id = result.insertId;
      const orderItems = items.map(item => [
        order_id,
        item.product_id,
        item.quantity,
        item.unit_price
      ]);

      db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES ?',
        [orderItems],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: 'Order placed successfully', order_id });
        }
      );
    }
  );
});

// PATCH /api/orders/:id
router.patch('/:id', (req, res) => {
  const { payment_status } = req.body;
  db.query(
    'UPDATE orders SET payment_status = ? WHERE order_id = ?',
    [payment_status, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Payment status updated' });
    }
  );
});

module.exports = router;