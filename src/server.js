const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const eventRoutes = require('./routes/eventRoutes');

const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const forumRoutes = require('./routes/forumRoutes');
const jobRoutes = require('./routes/jobRoutes');

const newsRoutes = require('./routes/newsRoutes');


const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
// const replyRoutes = require('./routes/replyRoutes');
// const analyticsRoutes = require('./routes/analyticsRoutes');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(fileUpload());

app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/admin', analyticsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/groups', groupRoutes);
// app.use('/api', replyRoutes);
// app.use('/api', ForumReplyRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/media', mediaRoutes);
app.use(notFound);
app.use(errorHandler);




const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} and database connectd succesfully`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
