const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', transactionController.getTransactions);
router.post('/', transactionController.addTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;