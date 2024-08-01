Here's the complete README file with all the API endpoints and their descriptions:

---

# OSAAGOS API Documentation

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
  ```
- **Response**:
  ```json
  {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "token": "JWT_token"
  }
  ```

### Login User
- **Endpoint**: `POST /api/users/login`
- **Description**: Logs in a user.
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "token": "JWT_token"
  }
  ```

### Get User Profile
- **Endpoint**: `GET /api/users/profile`
- **Description**: Retrieves the profile of the authenticated user.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  {
    "_id": "user_id",
    "name": "User Name",
    "email": "user@example.com"
  }
  ```

### Update User Profile
- **Endpoint**: `PUT /api/users/profile`
- **Description**: Updates the profile of the authenticated user.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
  - `Content-Type`: `multipart/form-data`
- **Body**:
  - `profilePicture`: Image file to upload.
  - Other fields to update, e.g., `name`, `email`.
- **Response**:
  ```json
  {
    "_id": "user_id",
    "name": "Updated Name",
    "email": "updated@example.com",
    "profilePicture": "profile_picture_url"
  }
  ```

### Search Alumni
- **Endpoint**: `GET /api/users/search`
- **Description**: Searches for alumni users.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  [
    {
      "_id": "alumni_id",
      "name": "Alumni Name",
      "email": "alumni@example.com"
    }
  ]
  ```

### Admin Dashboard
- **Endpoint**: `GET /api/users/admin/dashboard`
- **Description**: Retrieves admin dashboard information.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  {
    "totalUsers": 100,
    "totalAlumni": 50,
    "totalEvents": 20
  }
  ```

## Campaigns

### Create Campaign
- **Endpoint**: `POST /api/campaigns`
- **Description**: Creates a new campaign.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
    "title": "Campaign Title",
    "description": "Campaign Description",
    "goal": 1000
  }
  ```
- **Response**:
  ```json
  {
    "_id": "campaign_id",
    "title": "Campaign Title",
    "description": "Campaign Description",
    "goal": 1000,
    "createdBy": "user_id"
  }
  ```

### Get All Campaigns
- **Endpoint**: `GET /api/campaigns`
- **Description**: Retrieves all campaigns.
- **Response**:
  ```json
  [
    {
      "_id": "campaign_id",
      "title": "Campaign Title",
      "description": "Campaign Description",
      "goal": 1000,
      "createdBy": "user_id"
    }
  ]
  ```

### Get Campaign by ID
- **Endpoint**: `GET /api/campaigns/:id`
- **Description**: Retrieves a specific campaign by ID.
- **Response**:
  ```json
  {
    "_id": "campaign_id",
    "title": "Campaign Title",
    "description": "Campaign Description",
    "goal": 1000,
    "createdBy": "user_id"
  }
  ```

### Update Campaign
- **Endpoint**: `PUT /api/campaigns/:id`
- **Description**: Updates a specific campaign by ID.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
    "title": "Updated Campaign Title",
    "description": "Updated Campaign Description",
    "goal": 2000
  }
  ```
- **Response**:
  ```json
  {
    "_id": "campaign_id",
    "title": "Updated Campaign Title",
    "description": "Updated Campaign Description",
    "goal": 2000,
    "createdBy": "user_id"
  }
  ```

## Analytics

### Get Analytics
- **Endpoint**: `GET /api/analytics`
- **Description**: Retrieves analytics data for the admin.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  {
    "totalUsers": 100,
    "totalAlumni": 50,
    "totalDonations": 5000
  }
  ```

## Donations

### Create Donation
- **Endpoint**: `POST /api/donations`
- **Description**: Creates a new donation.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
    "campaignId": "campaign_id",
    "amount": 100
  }
  ```
- **Response**:
  ```json
  {
    "_id": "donation_id",
    "campaignId": "campaign_id",
    "amount": 100,
    "donatedBy": "user_id"
  }
  ```

### Get Donations by Campaign
- **Endpoint**: `GET /api/donations/campaign/:campaignId`
- **Description**: Retrieves donations for a specific campaign.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  [
    {
      "_id": "donation_id",
      "amount": 100,
      "donatedBy": "user_id",
      "campaignId": "campaign_id"
    }
  ]
  ```

### Get Donations by User
- **Endpoint**: `GET /api/donations/user`
- **Description**: Retrieves donations made by the authenticated user.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  [
    {
      "_id": "donation_id",
      "amount": 100,
      "donatedBy": "user_id",
      "campaignId": "campaign_id"
    }
  ]
  ```

## Events

### Create Event
- **Endpoint**: `POST /api/events/create`
- **Description**: Creates a new event.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
    "title": "Event Title",
    "description": "Event Description",
    "date": "2024-10-01",
    "location": "Event Location"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "event_id",
    "title": "Event Title",
    "description": "Event Description",
    "date": "2024-10-01",
    "location": "Event Location",
    "createdBy": "user_id"
  }
  ```

### Get All Events
- **Endpoint**: `GET /api/events`
- **Description**: Retrieves all events.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
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
  ```

### Get Event by ID
- **Endpoint**: `GET /api/events/:id`
- **Description**: Retrieves a specific event by ID.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  {
    "_id": "event_id",
    "title": "Event Title",
    "description": "Event Description",
    "date": "2024-10-01",
    "location": "Event Location",
    "createdBy": "user_id"
  }
  ```

### RSVP to Event
- **Endpoint**: `POST /api/events/:id/rsvp`
- **Description**: RSVP to a specific event.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  {
    "message": "Successfully

 RSVP'd to the event"
  }
  ```

## Forums

### Create Forum
- **Endpoint**: `POST /api/forums/create`
- **Description**: Creates a new forum.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
    "title": "Forum Title",
    "description": "Forum Description"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "forum_id",
    "title": "Forum Title",
    "description": "Forum Description",
    "createdBy": "user_id"
  }
  ```

### Get All Forums
- **Endpoint**: `GET /api/forums`
- **Description**: Retrieves all forums.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  [
    {
      "_id": "forum_id",
      "title": "Forum Title",
      "description": "Forum Description",
      "createdBy": "user_id"
    }
  ]
  ```

### Create Post
- **Endpoint**: `POST /api/forums/:forumId/post`
- **Description**: Creates a new post in a specific forum.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
    "content": "Post Content"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "post_id",
    "content": "Post Content",
    "forumId": "forum_id",
    "createdBy": "user_id"
  }
  ```

### Get Posts by Forum
- **Endpoint**: `GET /api/forums/:forumId/posts`
- **Description**: Retrieves all posts in a specific forum.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  [
    {
      "_id": "post_id",
      "content": "Post Content",
      "forumId": "forum_id",
      "createdBy": "user_id"
    }
  ]
  ```

## Groups

### Create Group
- **Endpoint**: `POST /api/groups/create`
- **Description**: Creates a new group.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
    "name": "Group Name",
    "description": "Group Description"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "group_id",
    "name": "Group Name",
    "description": "Group Description",
    "createdBy": "user_id"
  }
  ```

### Join Group
- **Endpoint**: `POST /api/groups/join/:groupId`
- **Description**: Join a specific group.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  {
    "message": "Successfully joined the group"
  }
  ```

### Get All Groups
- **Endpoint**: `GET /api/groups`
- **Description**: Retrieves all groups.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  [
    {
      "_id": "group_id",
      "name": "Group Name",
      "description": "Group Description",
      "createdBy": "user_id"
    }
  ]
  ```

## Media

### Upload Media
- **Endpoint**: `POST /api/media/upload`
- **Description**: Uploads a new media file.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
  - `Content-Type`: `multipart/form-data`
- **Body**:
  - `file`: Media file to upload.
- **Response**:
  ```json
  {
    "_id": "media_id",
    "fileName": "file_name",
    "fileUrl": "file_url",
    "uploadedBy": "user_id"
  }
  ```

### Get All Media
- **Endpoint**: `GET /api/media`
- **Description**: Retrieves all media files.
- **Response**:
  ```json
  [
    {
      "_id": "media_id",
      "fileName": "file_name",
      "fileUrl": "file_url",
      "uploadedBy": "user_id"
    }
  ]
  ```

### Get Media by ID
- **Endpoint**: `GET /api/media/:id`
- **Description**: Retrieves a specific media file by ID.
- **Response**:
  ```json
  {
    "_id": "media_id",
    "fileName": "file_name",
    "fileUrl": "file_url",
    "uploadedBy": "user_id"
  }
  ```

## Messages

### Send Message
- **Endpoint**: `POST /api/messages/send`
- **Description**: Sends a new message.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
    "recipientId": "recipient_id",
    "content": "Message Content"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "message_id",
    "senderId": "user_id",
    "recipientId": "recipient_id",
    "content": "Message Content"
  }
  ```

### Get Messages
- **Endpoint**: `GET /api/messages`
- **Description**: Retrieves messages for the authenticated user.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Response**:
  ```json
  [
    {
      "_id": "message_id",
      "senderId": "user_id",
      "recipientId": "recipient_id",
      "content": "Message Content"
    }
  ]
  ```

## News

### Create News
- **Endpoint**: `POST /api/news/create`
- **Description**: Creates a new news article.
- **Headers**: 
  - `Authorization`: Bearer `<your_jwt_token>`
- **Body**:
  ```json
  {
    "title": "News Title",
    "content": "News Content"
  }
  ```
- **Response**:
  ```json
  {
    "_id": "news_id",
    "title": "News Title",
    "content": "News Content",
    "createdBy": "user_id"
  }
  ```

### Get All News
- **Endpoint**: `GET /api/news`
- **Description**: Retrieves all news articles.
- **Response**:
  ```json
  [
    {
      "_id": "news_id",
      "title": "News Title",
      "content": "News Content",
      "createdBy": "user_id"
    }
  ]
  ```

### Get News by ID
- **Endpoint**: `GET /api/news/:id`
- **Description**: Retrieves a specific news article by ID.
- **Response**:
  ```json
  {
    "_id": "news_id",
    "title": "News Title",
    "content": "News Content",
    "createdBy": "user_id"
  }
  ```

### Subscribe to Newsletter
- **Endpoint**: `POST /api/news/subscribe`
- **Description**: Subscribes a user to the newsletter.
- **Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Successfully subscribed to the newsletter"
  }
  ```

---

This README file includes detailed descriptions, request formats, and example responses for all the API endpoints. Simply copy and paste this content into your README file.
