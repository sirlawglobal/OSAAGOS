const express = require('express');

const {FetchUserProfile} = require("../controller/superAdminController")
const {isSuperAdmin , protect} = require('../middleware/authMiddleware');
const router = express.Router();
// All Users
router.use(protect);
router.use(isSuperAdmin);
router.get('/users', FetchUserProfile);
// router.get('/usersprofile', FetchUser);

module.exports = router;