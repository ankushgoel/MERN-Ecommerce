import express from 'express';
const router = express.Router();
import products from '../data/products.js';

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p._id == id);
  //   console.log(id, product);
  res.json(product);
});

export default router;
