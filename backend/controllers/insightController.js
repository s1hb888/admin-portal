const User = require('../models/User');
const Feedback = require('../models/Feedback');
/*const getDashboardData = async (req, res) => {
  try {
    // total kids enrolled
    const totalKids = await User.countDocuments();

    // active parent accounts
    const activeParents = await User.countDocuments({ role: "parent", isActive: true });

    // last month increment (dummy abhi ke liye)
    const lastMonthIncrease = 5; // TODO: calculate from createdAt

    // age distribution
    const ageDistribution = await User.aggregate([
      { $group: { _id: "$kidAge", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    const formattedAge = ageDistribution.map(item => ({
      age: item._id ? item._id.toString() : "Unknown",
      count: item.count
    }));

    // gender distribution (only if kidGender exists in schema)
    let formattedGender = [];
    if (User.schema.path("kidGender")) {
      const genderDistribution = await User.aggregate([
        { $group: { _id: "$kidGender", count: { $sum: 1 } } }
      ]);
      formattedGender = genderDistribution.map(item => ({
        gender: item._id ? item._id : "Unknown",
        count: item.count
      }));
    }

    res.json({
      stats: {
        totalKids,
        activeParents,
        lastMonthIncrease
      },
      distributions: {
        age: formattedAge,
        gender: formattedGender
      }
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).json({ message: "Server error" });
  }
};
*/

// ✅ Age distribution
const getAgeDistribution = async (req, res) => {
  try {
    const distribution = await User.aggregate([
      {
        $group: {
          _id: "$kidAge",
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ message: "Error fetching age distribution", error });
  }
};

// ✅ Gender distribution (dummy for now, since gender not in schema)
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

const getUserStats = async (req, res) => {
  try {
    const now = new Date();

    // ---------- Determine last & previous month/year ----------
    const lastMonth = now.getUTCMonth() === 0 ? 11 : now.getUTCMonth() - 1;
    const lastMonthYear = now.getUTCMonth() === 0 ? now.getUTCFullYear() - 1 : now.getUTCFullYear();

    const prevMonth = lastMonth === 0 ? 11 : lastMonth - 1;
    const prevMonthYear = lastMonth === 0 ? lastMonthYear - 1 : lastMonthYear;

    // ---------- Total & active users ----------
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ role: "parent", isActive: true });

    // ---------- Last month counts ----------
    const lastMonthUsersAgg = await User.aggregate([
      { $project: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } } },
      { $match: { month: lastMonth + 1, year: lastMonthYear } },
      { $count: "count" }
    ]);
    const lastMonthUsers = lastMonthUsersAgg[0]?.count || 0;

    const lastMonthActiveAgg = await User.aggregate([
      { $match: { role: "parent", isActive: true } },
      { $project: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } } },
      { $match: { month: lastMonth + 1, year: lastMonthYear } },
      { $count: "count" }
    ]);
    const lastMonthActive = lastMonthActiveAgg[0]?.count || 0;

    // ---------- Previous month counts ----------
    const prevMonthUsersAgg = await User.aggregate([
      { $project: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } } },
      { $match: { month: prevMonth + 1, year: prevMonthYear } },
      { $count: "count" }
    ]);
    const prevMonthUsers = prevMonthUsersAgg[0]?.count || 0;

    const prevMonthActiveAgg = await User.aggregate([
      { $match: { role: "parent", isActive: true } },
      { $project: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } } },
      { $match: { month: prevMonth + 1, year: prevMonthYear } },
      { $count: "count" }
    ]);
    const prevMonthActive = prevMonthActiveAgg[0]?.count || 0;

    // ---------- Ratings ----------
    const ratingsData = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);
    const avgRating = ratingsData[0]?.avgRating || 0;

    const lastMonthRatingsAgg = await Feedback.aggregate([
      { $project: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" }, rating: 1 } },
      { $match: { month: lastMonth + 1, year: lastMonthYear } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);
    const avgRatingLastMonth = lastMonthRatingsAgg[0]?.avgRating || 0;

    const prevMonthRatingsAgg = await Feedback.aggregate([
      { $project: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" }, rating: 1 } },
      { $match: { month: prevMonth + 1, year: prevMonthYear } },
      { $group: { _id: null, avgRating: { $avg: "$rating" } } }
    ]);
    const avgRatingPrevMonth = prevMonthRatingsAgg[0]?.avgRating || 0;

    // ---------- Differences ----------
    const diffUsers = lastMonthUsers - prevMonthUsers;
    const diffActive = lastMonthActive - prevMonthActive;
    const diffRating = avgRatingLastMonth - avgRatingPrevMonth;

    // ---------- Response ----------
    res.json({
      totalUsers,
      activeUsers,
      avgRating: avgRating.toFixed(2),
      changes: {
        users: diffUsers,
        active: diffActive,
        avgRating: diffRating.toFixed(2)
      }
    });

  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Error fetching stats", error });
  }
};


const getAllParentAccounts = async (req, res) => {
  try {
    const parents = await User.find({ role: 'parent' });
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parent accounts", error });
  }
};

// ✅ Location insights (city + area)
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

    // Format as { city, area, count }
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

// ✅ Average rating insights
const getRatingsInsights = async (req, res) => {
  try {
    const ratingsData = await Feedback.aggregate([
      {
        $group: {
          _id: "$course",
          avgRating: { $avg: "$rating" },
          totalRatings: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(ratingsData);
  } catch (err) {
    console.error("Error fetching ratings insights:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // latest first
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks", error: err });
  }
};


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


