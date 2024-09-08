const User = require('../models/User');

exports.FetchUserProfile = async (req, res) => {
  try {
      // Ensure only super admins can access this
      if (req.user.role !== 'Superadmin') {
          return res.status(403).json({ message: 'Access denied' });
      }

      // Fetch users including the plainPassword field
      const users = await User.find({}, 'name email phone plainPassword role profilePicture education profession graduationYear fieldOfStudy address company');

      res.status(200).json(users);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching users', error: err });
  }
};
