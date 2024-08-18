

// // routes/adminRoutes.js
// const express = require('express');
// const { protect, authorize, admin  } = require('../middleware/authMiddleware');

// const {

// createAlumniProfile,getAlumniProfiles,updateAlumniProfile,deleteAlumniProfile, 

// getEvents,createEvent,updateEvent,
// deleteEvent,

// getNews,getNewsById , createNews,updateNews,deleteNews,

// createForum, getForums, getForumById, updateForum, deleteForum,

// createCampaign , getCampaigns, getCampaignById,updateCampaign , deleteCampaign,

// createForum, getForums, getForumById, updateForum, deleteForum, 

// createDonation , getDonations, getDonationById,updateDonation , deleteDonation,

// createForum, getForums, getForumById, updateForum, deleteForum, 

// createDonation , getDonations, getDonationById,updateDonation , deleteDonation,

// createForum, getForums, getForumById, updateForum, deleteForum, 

// createPost ,getPosts , getPostById,updatePost , deletePost,

// } = require('../controller/adminController');

// const router = express.Router();

// router.use(protect);
// router.use(authorize('Admin'));

// // Events
// router.get('/events', getEvents);
// router.post('/events', createEvent);
// router.put('/events/:id', updateEvent);
// router.delete('/events/:id', deleteEvent);

// // Alumni Profiles
// router.post('/alumni', createAlumniProfile);
// router.get('/alumni', getAlumniProfiles);
// router.put('/alumni/:id', updateAlumniProfile);
// router.delete('/alumni/:id', deleteAlumniProfile);

// // forum
// router.post('/forum', createForum);
// router.get('/forum', getForums );
// router.get('/forum/:id', getForumById);
// router.put('/forum/:id', updateForum);
// router.delete('/forum/:id', deleteForum);

// // campaign
// router.post('/campaign', createCampaign);
// router.get('/campaign', getCampaigns );
// router.get('/campaign/:id', getCampaignById);
// router.put('/campaign/:id', updateCampaign);
// router.delete('/campaign/:id', deleteCampaign);


// // donation
// router.post('/donation', createDonation );
// router.get('/donation', getDonations );
// router.get('/donation/:id', getDonationById);
// router.put('/donation/:id', updateDonation);
// router.delete('/donation/:id', deleteDonation);

// // Group
// router.post('/group', createGroup );
// router.get('/group', getGroups );
// router.get('/group/:id', getGroupById);
// router.put('/group/:id', updateGroup);
// router.delete('/group/:id', deleteGroup);

// // Post
// router.post('/post', createPost );
// router.get('/post', getPosts );
// router.get('/post/:id', getPostById);
// router.put('/post/:id', updatePost );
// router.delete('/post/:id', deletePost);

// // News
// router.get('/news', getNews);
// router.put('/news/:id', getNewsById );
// router.post('/news', createNews);
// router.put('/news/:id', updateNews);
// router.delete('/news/:id', deleteNews);

// // Media
// router.get('/media', getMedia);
// router.put('/media/:id', updateMedia);
// router.delete('/media/:id', deleteMedia);

// module.exports = router;
