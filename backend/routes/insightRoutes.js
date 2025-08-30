const express = require('express');
const router = express.Router();

const {
  getAllParentAccounts,
  toggleAccountStatus,
  getAgeDistribution,
  getGenderDistribution,
  getUserStats,
  getLocationInsights,
  getRatingsInsights,
  getAllFeedbacks
} = require('../controllers/insightController');

// ✅ Parent Accounts
router.get('/', getAllParentAccounts);
router.put('/toggle-status/:id', toggleAccountStatus);

// ✅ Insights
router.get('/age-distribution', getAgeDistribution);
router.get('/gender-distribution', getGenderDistribution);
router.get('/stats', getUserStats);
router.get('/locations', getLocationInsights);
router.get('/ratings', getRatingsInsights);
router.get('/feedbacks', getAllFeedbacks);

module.exports = router;
