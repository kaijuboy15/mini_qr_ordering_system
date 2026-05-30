const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));