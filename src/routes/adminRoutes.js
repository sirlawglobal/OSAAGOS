

// routes/adminRoutes.js
const express = require('express');
const { protect, authorize, admin  } = require('../middleware/authMiddleware');

const {
createAlumniProfile,getAlumniProfiles,getAlumniProfileById,
updateAlumniProfile,deleteAlumniProfile, 

getEvents,getEventById,createEvent,updateEvent,
deleteEvent,

getNews,getNewsById , createNews,updateNews,deleteNews,


createCampaign , getCampaigns, getCampaignById,updateCampaign , deleteCampaign,

createForum, getForums, getForumById, updateForum, deleteForum, 

createGroup, getGroups , getGroupById, updateGroup, deleteGroup, 

createDonation , getDonations, getDonationById,updateDonation , deleteDonation,


createPost ,getPosts , getPostById,updatePost , deletePost,

FetchUserProfile,FetchUser,

createJob,getAllJobs,updateJob,deleteJob,

createMedia,getMedia,getMediaById,updateMedia,deleteMedia,getAnalytics

} = require('../controller/adminController');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

// Events
router.post('/events', createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id', updateEvent);
router.delete('/events/:id', deleteEvent);

// Alumni Profiles
router.post('/alumni', createAlumniProfile);
router.get('/alumni', getAlumniProfiles);
router.get('/alumni/:id', getAlumniProfileById);
router.put('/alumni/:id', updateAlumniProfile);
router.delete('/alumni/:id', deleteAlumniProfile);

// forum
router.post('/forum', createForum);
router.get('/forum', getForums );
router.get('/forum/:id', getForumById);
router.put('/forum/:id', updateForum);
router.delete('/forum/:id', deleteForum);

// campaign
router.post('/campaign', createCampaign);
router.get('/campaign', getCampaigns );
router.get('/campaign/:id', getCampaignById);
router.put('/campaign/:id', updateCampaign);
router.delete('/campaign/:id', deleteCampaign);


// donation
router.post('/donation', createDonation );
router.get('/donation', getDonations );
router.get('/donation/:id', getDonationById);
router.put('/donation/:id', updateDonation);
router.delete('/donation/:id', deleteDonation);

// Group
router.post('/group', createGroup );
router.get('/group', getGroups );
router.get('/group/:id', getGroupById);
router.put('/group/:id', updateGroup);
router.delete('/group/:id', deleteGroup);

// Post
router.post('/post', createPost );
router.get('/post', getPosts );
router.get('/post/:id', getPostById);
router.put('/post/:id', updatePost );
router.delete('/post/:id', deletePost);

// News
router.get('/news', getNews);
router.put('/news/:id', getNewsById );
router.post('/news', createNews);
router.put('/news/:id', updateNews);
router.delete('/news/:id', deleteNews);

// jobs
router.post('/jobs', createJob);
router.get('/jobs', getAllJobs);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);

// All Users
router.get('/users', FetchUserProfile);
router.get('/usersprofile', FetchUser);

// Media
router.post('/media', createMedia );
router.get('/media', getMedia);
router.get('/media/:id', getMediaById );
router.put('/media/:id', updateMedia);
router.delete('/media/:id', deleteMedia);

router.get('/analytics', getAnalytics);

module.exports = router;
