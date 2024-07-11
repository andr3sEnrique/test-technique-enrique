const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

// Protege las rutas que necesitan autenticación con el middleware
router.get('/', authMiddleware, productController.getAllProducts);
router.post('/', authMiddleware, productController.createProduct);
router.get('/:id', authMiddleware, productController.getProductById);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;
