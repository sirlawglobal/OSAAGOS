const express = require('express');
const { registerUser,verifyEmail , loginUser, getUserProfile, updateUserProfile,getUserProfileByEmail, adminDashboard , searchAlumni} = require('../controller/userController');
const { protect, authorize } = require('../middleware/authMiddleware');
const  uploadMiddleware = require('../middleware/uploadMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/verify', verifyEmail);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.get('/profile/email', getUserProfileByEmail);
router.get('/search', protect, searchAlumni); 
// router.put('/profile',  uploadMiddleware, updateUserProfile)
router.put('/profile', protect, uploadMiddleware, updateUserProfile);
// router.put('/profile',  updateUserProfile);
router.get('/admin/dashboard', protect, authorize('Admin'), adminDashboard);

// router.put('/profile', protect, upload.single('profilePicture'), updateUserProfile);
// router.put('/profile', protect, upload, updateUserProfile);
// router.put('/profile', protect, uploadMiddleware, updateUserProfile);


// router.put('/profile',protect, updateUserProfile);



// Admin-only route

// const fileUpload = require('express-fileupload');


module.exports = router;
