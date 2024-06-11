import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import products from './data/products.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 8080;

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p._id == id);
  //   console.log(id, product);
  res.json(product);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));