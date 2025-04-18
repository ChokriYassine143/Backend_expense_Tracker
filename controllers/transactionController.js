const Transaction = require('../models/TransactionModel');

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

exports.addTransaction = async (req, res) => {
  console.log('Adding transaction:', req.body);
  try {
    const transactionData = {
      ...req.body,
      userId: req.user.userId,
      
    };

    const transaction = new Transaction(transactionData);
    await transaction.save();

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).json({ error: 'Failed to add transaction' });
  }
};

exports.deleteTransaction = async (req, res) => {
  console.log('Deleting transaction with ID:', req.params.id);
  
  try {
    const { id } = req.params;
    const transaction = await Transaction.findOneAndDelete({ _id:id, userId: req.user.userId });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};