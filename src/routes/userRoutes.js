const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile,getUserProfileByEmail, adminDashboard , searchAlumni} = require('../controller/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();



router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/profile/email', protect, getUserProfileByEmail);
router.put('/profile', protect, upload.single('profilePicture'), updateUserProfile);
router.get('/search', protect, searchAlumni); 

// Admin-only route
router.get('/admin/dashboard', protect, authorize('Admin'), adminDashboard);

module.exports = router;
