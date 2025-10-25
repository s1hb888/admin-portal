const User = require('../models/User');
const Feedback = require('../models/Feedback');

// ✅ Age distribution
const getAgeDistribution = async (req, res) => {
  try {
    const distribution = await User.aggregate([
      { $group: { _id: "$kidAge", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ message: "Error fetching age distribution", error });
  }
};

// ✅ Gender distribution (dummy placeholder)
const getGenderDistribution = async (req, res) => {
  try {
    res.json([
      { _id: "male", count: 0 },
      { _id: "female", count: 0 }
    ]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching gender distribution", error });
  }
};

// ✅ Overall stats and monthly comparison
const getUserStats = async (req, res) => {
  try {
    const now = new Date();
    const lastMonth = now.getUTCMonth() === 0 ? 11 : now.getUTCMonth() - 1;
    const lastMonthYear = now.getUTCMonth() === 0 ? now.getUTCFullYear() - 1 : now.getUTCFullYear();
    const prevMonth = lastMonth === 0 ? 11 : lastMonth - 1;
    const prevMonthYear = lastMonth === 0 ? lastMonthYear - 1 : lastMonthYear;

    // ---------- Total and active users ----------
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ role: "parent", isActive: true });

    // ---------- Month-wise new user stats ----------
    const monthCount = async (month, year, filter = {}) => {
      const result = await User.aggregate([
        { $match: filter },
        { $project: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } } },
        { $match: { month: month + 1, year } },
        { $count: "count" }
      ]);
      return result[0]?.count || 0;
    };

    const lastMonthUsers = await monthCount(lastMonth, lastMonthYear);
    const prevMonthUsers = await monthCount(prevMonth, prevMonthYear);
    const lastMonthActive = await monthCount(lastMonth, lastMonthYear, { role: "parent", isActive: true });
    const prevMonthActive = await monthCount(prevMonth, prevMonthYear, { role: "parent", isActive: true });

    // ---------- Average satisfaction (composite score) ----------
    const avgSatisfaction = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgEaseOfUse: { $avg: "$appEaseOfUse" },
          avgPerformance: { $avg: "$performanceRating" },
          avgDesign: { $avg: "$designSatisfaction" },
          avgFeature: { $avg: "$featureUsefulness" }
        }
      }
    ]);

    const averages = avgSatisfaction[0] || {};
    const compositeAvg =
      ((averages.avgEaseOfUse || 0) +
        (averages.avgPerformance || 0) +
        (averages.avgDesign || 0) +
        (averages.avgFeature || 0)) /
      4;

    // ---------- Calculate month differences ----------
    const diffUsers = lastMonthUsers - prevMonthUsers;
    const diffActive = lastMonthActive - prevMonthActive;

    res.json({
      totalUsers,
      activeUsers,
      avgSatisfaction: compositeAvg.toFixed(2),
      avgBreakdown: {
        easeOfUse: averages.avgEaseOfUse?.toFixed(2) || 0,
        performance: averages.avgPerformance?.toFixed(2) || 0,
        design: averages.avgDesign?.toFixed(2) || 0,
        feature: averages.avgFeature?.toFixed(2) || 0
      },
      changes: {
        users: diffUsers,
        active: diffActive
      }
    });

  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching stats", error });
  }
};

// ✅ Fetch all parent accounts
const getAllParentAccounts = async (req, res) => {
  try {
    const parents = await User.find({ role: 'parent' });
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parent accounts", error });
  }
};

// ✅ Location insights
const getLocationInsights = async (req, res) => {
  try {
    const locationData = await User.aggregate([
      {
        $group: {
          _id: { city: "$city", area: "$area" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.city": 1, "_id.area": 1 } }
    ]);

    const formatted = locationData.map(item => ({
      city: item._id.city || "Unknown",
      area: item._id.area || "Unknown",
      count: item.count
    }));

    res.json(formatted);
  } catch (err) {
    console.error("Error fetching location insights:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Ratings insights (now based on all rating fields)
const getRatingsInsights = async (req, res) => {
  try {
    const ratingMetrics = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgEaseOfUse: { $avg: "$appEaseOfUse" },
          avgPerformance: { $avg: "$performanceRating" },
          avgDesign: { $avg: "$designSatisfaction" },
          avgFeature: { $avg: "$featureUsefulness" }
        }
      }
    ]);
    res.json(ratingMetrics[0] || {});
  } catch (err) {
    console.error("Error fetching ratings insights:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Fetch all feedbacks
const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ dateOfFeedback: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks", error: err });
  }
};

// ✅ Toggle parent account status
const toggleAccountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error toggling status", error });
  }
};

module.exports = {
  getAllParentAccounts,
  toggleAccountStatus,
  getAgeDistribution,
  getGenderDistribution,
  getUserStats,
  getLocationInsights,
  getRatingsInsights,
  getAllFeedbacks
};
