const express = require('express');
const router = express.Router();
const {
  getDashboard, getAdminProducts, addProduct, editProduct, deleteProduct,
  getAdminOrders, updateOrderStatus, getUsers, updateUserRole, getPrescriptions
} = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.use(verifyToken, isAdmin);
router.get('/dashboard', getDashboard);
router.get('/products', getAdminProducts);
router.post('/products', addProduct);
router.put('/products/:id', editProduct);
router.delete('/products/:id', deleteProduct);
router.get('/orders', getAdminOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);
router.get('/prescriptions', getPrescriptions);

module.exports = router;
