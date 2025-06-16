const User = require('../models/User');  

exports.getAllParentAccounts = async (req, res) => {
  try {
    const parents = await User.find({ role: 'parent' }, 'kidName email age isActive');
    res.json(parents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


exports.toggleAccountStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isActive = !user.isActive;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
