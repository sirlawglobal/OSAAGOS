const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const dotenv = require('dotenv');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const eventRoutes = require('./routes/eventRoutes');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');
const groupRoutes = require('./routes/groupRoutes');
const forumRoutes = require('./routes/forumRoutes');
dotenv.config();
const newsRoutes = require('./routes/newsRoutes');
// const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const campaignRoutes = require('./routes/campaignRoutes');
const mediaRoutes = require('./routes/mediaRoutes');

const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', analyticsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/media', mediaRoutes);
app.use(notFound);
app.use(errorHandler);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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
