documentation for each endpoint:

markdown
Copy code
# API Documentation

## User Authentication

### Register User
- **Endpoint**: `POST /api/users/register`
- **Description**: Registers a new user.
- **Body**:
  ```json
  {
    "name": "User Name",
    "email": "user@example.com",
    "password": "password"
  }
Response:
json
Copy code
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "token": "jwt_token"
}
Login User
Endpoint: POST /api/users/login
Description: Logs in a user.
Body:
json
Copy code
{
  "email": "user@example.com",
  "password": "password"
}
Response:
json
Copy code
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com",
  "token": "jwt_token"
}
Get User Profile
Endpoint: GET /api/users/profile
Description: Retrieves the profile of the authenticated user.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
{
  "_id": "user_id",
  "name": "User Name",
  "email": "user@example.com"
}
Update User Profile
Endpoint: PUT /api/users/profile
Description: Updates the profile of the authenticated user.
Headers:
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
Body:
profilePicture: The new profile picture.
json
Copy code
{
  "name": "Updated User Name",
  "email": "updated_user@example.com"
}
Response:
json
Copy code
{
  "_id": "user_id",
  "name": "Updated User Name",
  "email": "updated_user@example.com"
}
Admin Dashboard
Endpoint: GET /api/users/admin/dashboard
Description: Retrieves admin dashboard data.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
{
  "totalUsers": 100,
  "totalCampaigns": 10,
  "totalDonations": 50000
}
Search Alumni
Endpoint: GET /api/users/search
Description: Searches for alumni.
Headers:
Authorization: Bearer <your_jwt_token>
Query Parameters:
q: The search query.
Response:
json
Copy code
[
  {
    "_id": "user_id",
    "name": "Alumni Name",
    "email": "alumni@example.com"
  }
]
Campaigns
Create a Campaign
Endpoint: POST /api/campaigns
Description: Creates a new campaign.
Headers:
Authorization: Bearer <your_jwt_token>
Body:
json
Copy code
{
  "title": "Campaign Title",
  "description": "Campaign Description",
  "targetAmount": 10000,
  "startDate": "2024-08-01",
  "endDate": "2024-12-01"
}
Response:
json
Copy code
{
  "_id": "campaign_id",
  "title": "Campaign Title",
  "description": "Campaign Description",
  "targetAmount": 10000,
  "startDate": "2024-08-01",
  "endDate": "2024-12-01",
  "createdBy": "user_id"
}
Get All Campaigns
Endpoint: GET /api/campaigns
Description: Retrieves all campaigns.
Response:
json
Copy code
[
  {
    "_id": "campaign_id",
    "title": "Campaign Title",
    "description": "Campaign Description",
    "targetAmount": 10000,
    "startDate": "2024-08-01",
    "endDate": "2024-12-01",
    "createdBy": "user_id"
  }
]
Get Campaign by ID
Endpoint: GET /api/campaigns/:id
Description: Retrieves a specific campaign by ID.
Response:
json
Copy code
{
  "_id": "campaign_id",
  "title": "Campaign Title",
  "description": "Campaign Description",
  "targetAmount": 10000,
  "startDate": "2024-08-01",
  "endDate": "2024-12-01",
  "createdBy": "user_id"
}
Update Campaign
Endpoint: PUT /api/campaigns/:id
Description: Updates a specific campaign.
Headers:
Authorization: Bearer <your_jwt_token>
Body:
json
Copy code
{
  "title": "Updated Campaign Title",
  "description": "Updated Campaign Description",
  "targetAmount": 15000,
  "startDate": "2024-09-01",
  "endDate": "2024-12-31"
}
Response:
json
Copy code
{
  "_id": "campaign_id",
  "title": "Updated Campaign Title",
  "description": "Updated Campaign Description",
  "targetAmount": 15000,
  "startDate": "2024-09-01",
  "endDate": "2024-12-31",
  "createdBy": "user_id"
}
Analytics
Get Analytics
Endpoint: GET /api/analytics
Description: Retrieves analytics data.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
{
  "totalUsers": 100,
  "totalDonations": 50000,
  "totalCampaigns": 10
}
Donations
Create Donation
Endpoint: POST /api/donations
Description: Creates a new donation.
Headers:
Authorization: Bearer <your_jwt_token>
Body:
json
Copy code
{
  "campaignId": "campaign_id",
  "amount": 100
}
Response:
json
Copy code
{
  "_id": "donation_id",
  "campaignId": "campaign_id",
  "amount": 100,
  "donatedBy": "user_id"
}
Get Donations by Campaign
Endpoint: GET /api/donations/campaign/:campaignId
Description: Retrieves donations for a specific campaign.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
[
  {
    "_id": "donation_id",
    "campaignId": "campaign_id",
    "amount": 100,
    "donatedBy": "user_id"
  }
]
Get Donations by User
Endpoint: GET /api/donations/user
Description: Retrieves donations made by the authenticated user.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
[
  {
    "_id": "donation_id",
    "campaignId": "campaign_id",
    "amount": 100,
    "donatedBy": "user_id"
  }
]
Events
Create Event
Endpoint: POST /api/events/create
Description: Creates a new event.
Headers:
Authorization: Bearer <your_jwt_token>
Body:
json
Copy code
{
  "title": "Event Title",
  "description": "Event Description",
  "date": "2024-10-01",
  "location": "Event Location"
}
Response:
json
Copy code
{
  "_id": "event_id",
  "title": "Event Title",
  "description": "Event Description",
  "date": "2024-10-01",
  "location": "Event Location",
  "createdBy": "user_id"
}
Get All Events
Endpoint: GET /api/events
Description: Retrieves all events.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
[
  {
    "_id": "event_id",
    "title": "Event Title",
    "description": "Event Description",
    "date": "2024-10-01",
    "location": "Event Location",
    "createdBy": "user_id"
  }
]
Get Event by ID
Endpoint: GET /api/events/:id
Description: Retrieves a specific event by ID.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
{
  "_id": "event_id",
  "title": "Event Title",
  "description": "Event Description",
  "date": "2024-10-01",
  "location": "Event Location",
  "createdBy": "user_id"
}
RSVP to Event
Endpoint: POST /api/events/:id/rsvp
Description: RSVP to a specific event.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
{
  "message": "Successfully RSVP'd to the event"
}
Forums
Create Forum
Endpoint: POST /api/forums/create
Description: Creates a new forum.
Headers:
Authorization: Bearer <your_jwt_token>
Body:
json
Copy code
{
  "title": "Forum Title",
  "description": "Forum Description"
}
Response:
json
Copy code
{
  "_id": "forum_id",
  "title": "Forum Title",
  "description": "Forum Description",
  "createdBy": "user_id"
}
Get All Forums
Endpoint: GET /api/forums
Description: Retrieves all forums.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
[
  {
    "_id": "forum_id",
    "title": "Forum Title",
    "description": "Forum Description",
    "createdBy": "user_id"
  }
]
Create Post in Forum
Endpoint: POST /api/forums/:forumId/post
Description: Creates a new post in a specific forum.
Headers:
Authorization: Bearer <your_jwt_token>
Body:
json
Copy code
{
  "content": "Post Content"
}
Response:
json
Copy code
{
  "_id": "post_id",
  "content": "Post Content",
  "createdBy": "user_id",
  "forumId": "forum_id"
}
Get Posts in Forum
Endpoint: GET /api/forums/:forumId/posts
Description: Retrieves posts in a specific forum.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
[
  {
    "_id": "post_id",
    "content": "Post Content",
    "createdBy": "user_id",
    "forumId": "forum_id"
  }
]
Groups
Create Group
Endpoint: POST /api/groups/create
Description: Creates a new group.
Headers:
Authorization: Bearer <your_jwt_token>
Body:
json
Copy code
{
  "name": "Group Name",
  "description": "Group Description"
}
Response:
json
Copy code
{
  "_id": "group_id",
  "name": "Group Name",
  "description": "Group Description",
  "createdBy": "user_id"
}
Join Group
Endpoint: POST /api/groups/join/:groupId
Description: Join a specific group.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
{
  "message": "Successfully joined the group"
}
Get All Groups
Endpoint: GET /api/groups
Description: Retrieves all groups.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
[
  {
    "_id": "group_id",
    "name": "Group Name",
    "description": "Group Description",
    "createdBy": "user_id"
  }
]
Media
Upload Media
Endpoint: POST /api/media/upload
Description: Uploads a media file.
Headers:
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
Body:
file: The media file to upload.
Response:
json
Copy code
{
  "_id": "media_id",
  "fileName": "filename.ext",
  "url": "http://path_to_file",
  "uploadedBy": "user_id"
}
Get All Media
Endpoint: GET /api/media
Description: Retrieves all media files.
Response:
json
Copy code
[
  {
    "_id": "media_id",
    "fileName": "filename.ext",
    "url": "http://path_to_file",
    "uploadedBy": "user_id"
  }
]
Get Media by ID
Endpoint: GET /api/media/:id
Description: Retrieves a specific media file by ID.
Response:
json
Copy code
{
  "_id": "media_id",
  "fileName": "filename.ext",
  "url": "http://path_to_file",
  "uploadedBy": "user_id"
}
Messages
Send Message
Endpoint: POST /api/messages/send
Description: Sends a new message.
Headers:
Authorization: Bearer <your_jwt_token>
Body:
json
Copy code
{
  "recipientId": "recipient_user_id",
  "content": "Message Content"
}
Response:
json
Copy code
{
  "_id": "message_id",
  "senderId": "sender_user_id",
  "recipientId": "recipient_user_id",
  "content": "Message Content",
  "timestamp": "2024-08-01T00:00:00Z"
}
Get Messages
Endpoint: GET /api/messages
Description: Retrieves messages for the authenticated user.
Headers:
Authorization: Bearer <your_jwt_token>
Response:
json
Copy code
[
  {
    "_id": "message_id",
    "senderId": "sender_user_id",
    "recipientId": "recipient_user_id",
    "content": "Message Content",
    "timestamp": "2024-08-01T00:00:00Z"
  }
]
News
Create News
Endpoint: POST /api/news/create
Description: Creates a new news item.
Headers:
Authorization: Bearer <your_jwt_token>
Body:
json
Copy code
{
  "title": "News Title",
  "content": "News Content"
}
Response:
json
Copy code
{
  "_id": "news_id",
  "title": "News Title",
  "content": "News Content",
  "createdBy": "user_id"
}
Get All News
Endpoint: GET /api/news
Description: Retrieves all news items.
Response:
json
Copy code
[
  {
    "_id": "news_id",
    "title": "News Title",
    "content": "News Content",
    "createdBy": "user_id"
  }
]
Get News by ID
Endpoint: GET /api/news/:id
Description: Retrieves a specific news item by ID.
Response:
json
Copy code
{
  "_id": "news_id",
  "title": "News Title",
  "content": "News Content",
  "createdBy": "user_id"
}
Subscribe to Newsletter
Endpoint: POST /api/news/subscribe
Description: Subscribes to the newsletter.
Body:
json
Copy code
{
  "email": "user@example.com"
}
Response:
json
Copy code
{
  "message": "Successfully subscribed to the newsletter"
}
Usage Instructions
Register a User: Send a POST request to /api/users/register with the required body.
Login User: Send a POST request to /api/users/login with the required body to receive a JWT token.
Authenticate Requests: For protected endpoints, include the JWT token in the Authorization header as Bearer <your_jwt_token>.
Make sure to follow the request and response formats as specified for each endpoint. Use valid JWT tokens for protected routes to ensure successful requests.


