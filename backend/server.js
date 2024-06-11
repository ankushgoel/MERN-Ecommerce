import express from 'express';
import products from './data/products.js';
const PORT = 8000;

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
  console.log(id, product);
  res.json(product);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
