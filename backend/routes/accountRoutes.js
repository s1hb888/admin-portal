const express = require('express');
const router = express.Router();
const {
  getAllParentAccounts,
  toggleAccountStatus
} = require('../controllers/accountController');

router.get('/', getAllParentAccounts);
router.put('/toggle-status/:id', toggleAccountStatus);

module.exports = router;

