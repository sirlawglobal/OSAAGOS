hosted on : https://osaagos-api-alumni-website.onrender.com/

## User Authentication and Authorization

### 1. Register a new user
- **Method**: POST
- **URL**: `/api/users/register`
- **Headers**: None
- **Body**:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password123",
        "role": "alumni"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "alumni",
        "token": "jwt_token"
    }
    ```

### 2. Login a user
- **Method**: POST
- **URL**: `/api/users/login`
- **Headers**: None
- **Body**:
    ```json
    {
        "email": "john@example.com",
        "password": "password123"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "alumni",
        "token": "jwt_token"
    }
    ```

### 3. Get user profile
- **Method**: GET
- **URL**: `/api/users/profile`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "alumni"
    }
    ```
### 3. Get all users
- **Method**: GET
- **URL**: `/api/users/allUsers`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    
       {
    "All users"
    }
    ```

### 4. Update user profile
- **Method**: PUT
- **URL**: `/api/users/profile`
- **Headers**:
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "newpassword123"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "66c039670212e06657714945",
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "Admin",
        "address": "123 Main St",
        "company": "ABC Corp",
        "education": "XYZ University",
        "fieldOfStudy": "Physics",
        "graduationYear": "2022",
        "profilePicture": "uploads/profilePicture-1723883773055.png",
        "id": "66c039670212e06657714945"
    }
    ```

## Alumni Profiles

### 5. Update alumni profile and profile picture
- **Method**: PUT
- **URL**: `/api/alumni/profile`
- **Headers**:
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**: `multipart/form-data`
    - `profilePicture`: File
    - `data`: JSON
        ```json
        {
            "personalDetails": {
                "address": "123 Main St",
                "phone": "555-555-5555"
            },
            "educationalDetails": {
                "degree": "B.Sc. in Computer Science",
                "graduationYear": "2020"
            },
            "professionalDetails": {
                "jobTitle": "Software Engineer",
                "company": "Tech Corp"
            }
        }
        ```
- **Response**:
    ```json
    {
        "_id": "user_id",
        "personalDetails": {
            "address": "123 Main St",
            "phone": "555-555-5555"
        },
        "educationalDetails": {
            "degree": "B.Sc. in Computer Science",
            "graduationYear": "2020"
        },
        "professionalDetails": {
            "jobTitle": "Software Engineer",
            "company": "Tech Corp"
        },
        "profilePicture": "path_to_uploaded_file"
    }
    ```

## Search and Filter

### 6. Search for alumni
- **Method**: GET
- **URL**: `/api/alumni/search`
- **Headers**: None
- **Query Parameters**:
    - `name`: String (optional)
    - `graduationYear`: String (optional)
    - `fieldOfStudy`: String (optional)
- **Response**:
    ```json
    [
        {
            "_id": "user_id",
            "name": "John Doe",
            "email": "john@example.com",
            "role": "alumni",
            "graduationYear": "2020",
            "fieldOfStudy": "Computer Science"
        },
        
    ]
    ```

## Networking

### 7. Send a message
- **Method**: POST
- **URL**: `/api/messages/send`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "to": "recipient_user_id",
        "content": "Hello, how are you?"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "message_id",
        "from": "user_id",
        "to": "recipient_user_id",
        "content": "Hello, how are you?",
        "timestamp": "2024-07-27T12:34:56Z"
    }
    ```

### 8. Get messages
- **Method**: GET
- **URL**: `/api/messages`
- **Headers**:
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Query Parameters**:
    - `contactId`: String (required)
- **Response**:
    ```json
    [
        {
            "_id": "message_id",
            "from": "user_id",
            "to": "contact_user_id",
            "content": "Hello, how are you?",
            "timestamp": "2024-07-27T12:34:56Z"
        },
    ]
    ```

## Groups

### 9. Create a group
- **Method**: POST
- **URL**: `/api/groups`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "name": "Tech Enthusiasts",
        "description": "A group for tech lovers"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "group_id",
        "name": "Tech Enthusiasts",
        "description": "A group for tech lovers",
        "createdBy": "user_id"
    }
    ```

### 10. Get all groups
- **Method**: GET
- **URL**: `/api/groups`
- **Headers**: None
- **Response**:
    ```json
    [
        {
            "_id": "group_id",
            "name": "Tech Enthusiasts",
            "description": "A group for tech lovers",
            "createdBy": "user_id"
        },


    ]
    ```

### 11. Join a group
- **Method**: POST
- **URL**: `/api/groups/join/groupId`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "groupId": "group_id"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Joined group successfully"
    }
    ```

### 11b. leave a group
- **Method**: POST
- **URL**: `/api/groups/leave/:groupId`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "groupId": "group_id"
    }
    ```
- **Response**:
    ```json
    {
        "message": "left group successfully"
    }
    ```

### 11_i. create group post 
- **Method**: POST
- **URL**: `/api/groups/:groupId/posts`
- **Headers**: None
- **Response**:
    ```json
    {
        "_id": "forum_post_id",
        "title": "How to improve coding skills?",
        "content": "Can someone share tips on improving coding skills?",
        "createdBy": "user_id",
        "createdAt": "2024-07-27T12:34:56Z"
    }
    ```

### 11_ii. Get all groups post
- **Method**: GET
- **URL**: `/api/groups/:groupId/posts`
- **Headers**: None
- **Response**:
    ```json
    [
        {
            "_id": "forum_post_id",
            "title": "How to improve coding skills?",
            "content": "Can someone share tips on improving coding skills?",
            "createdBy": "user_id",
            "createdAt": "2024-07-27T12:34:56Z"
        },
        
    ]
    ```


### 11_iii. Update a group post
- **Method**: PUT
- **URL**: `/api/groups/posts/:postId`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "Updated title",
        "content": "Updated content"
    }
    ```
- **Response**:


    ```json
    {
        "_id": "forum_post_id",
        "title": "Updated title",
        "content": "Updated content",
        "createdBy": "user_id",
        "updatedAt": "2024-07-27T12:34:56Z"
    }
    ```

### 11_iv. Delete a group post
- **Method**: DELETE
- **URL**: `/api/groups/posts/:postId`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "message": " post deleted successfully"
    }
    ```


## Forum


### 12. Create a forum 
- **Method**: POST
- **URL**: `/api/forums/create`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "How to improve coding skills?",
        "content": "Can someone share tips on improving coding skills?"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "forum_post_id",
        "title": "How to improve coding skills?",
        "content": "Can someone share tips on improving coding skills?",
        "createdBy": "user_id",
        "createdAt": "2024-07-27T12:34:56Z"
    }
    ```

### 13. Get all approved forum
- **Method**: GET
- **URL**: `/api/forums`
- **Headers**: None
- **Response**:
    ```json
    [
        {
            "_id": "forum_post_id",
            "title": "How to improve coding skills?",
            "content": "Can someone share tips on improving coding skills?",
            "createdBy": "user_id",
            "createdAt": "2024-07-27T12:34:56Z"
        },
        
    ]
    ```

### 14. create forum post 
- **Method**: POST
- **URL**: `/api/forums/:forumId/post`
- **Headers**: None
- **Response**:
    ```json
    {
        "_id": "forum_post_id",
        "title": "How to improve coding skills?",
        "content": "Can someone share tips on improving coding skills?",
        "createdBy": "user_id",
        "createdAt": "2024-07-27T12:34:56Z"
    }
    ```

### 14b. Get all forum post
- **Method**: GET
- **URL**: `/api/forums/:forumId/posts`
- **Headers**: None
- **Response**:
    ```json
    [
        {
            "_id": "forum_post_id",
            "title": "How to improve coding skills?",
            "content": "Can someone share tips on improving coding skills?",
            "createdBy": "user_id",
            "createdAt": "2024-07-27T12:34:56Z"
        },
        
    ]
    ```


### 15. Update a forum post
- **Method**: PUT
- **URL**: `api/forum/posts/:postId`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "Updated title",
        "content": "Updated content"
    }
    ```
- **Response**:


    ```json
    {
        "_id": "forum_post_id",
        "title": "Updated title",
        "content": "Updated content",
        "createdBy": "user_id",
        "updatedAt": "2024-07-27T12:34:56Z"
    }
    ```

### 16. Delete a forum post
- **Method**: DELETE
- **URL**: `api/forum/posts/:postId`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "message": "Forum post deleted successfully"
    }
    ```

## Events

### 17. Create an event
- **Method**: POST
- **URL**: `/api/events`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "Alumni Meetup",
        "description": "A meetup for all alumni members.",
        "date": "2024-09-01T18:00:00Z",
        "location": "123 Main St, City"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "event_id",
        "title": "Alumni Meetup",
        "description": "A meetup for all alumni members.",
        "date": "2024-09-01T18:00:00Z",
        "location": "123 Main St, City",
        "createdBy": "user_id"
    }
    ```

### 18. Get all events
- **Method**: GET
- **URL**: `/api/events`
- **Headers**: None
- **Response**:
    ```json
    [
        {
            "_id": "event_id",
            "title": "Alumni Meetup",
            "description": "A meetup for all alumni members.",
            "date": "2024-09-01T18:00:00Z",
            "location": "123 Main St, City",
            "createdBy": "user_id"
        },
        
    ]
    ```

### 19. Get event by ID
- **Method**: GET
- **URL**: `/api/events/:id`
- **Headers**: None
- **Response**:
    ```json
    {
        "_id": "event_id",
        "title": "Alumni Meetup",
        "description": "A meetup for all alumni members.",
        "date": "2024-09-01T18:00:00Z",
        "location": "123 Main St, City",
        "createdBy": "user_id"
    }
    ```

### 20. Update an event
- **Method**: PUT
- **URL**: `/api/events/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "Updated Event Title",
        "description": "Updated description",
        "date": "2024-09-02T18:00:00Z",
        "location": "456 Main St, City"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "event_id",
        "title": "Updated Event Title",
        "description": "Updated description",
        "date": "2024-09-02T18:00:00Z",
        "location": "456 Main St, City",
        "createdBy": "user_id",
        "updatedAt": "2024-07-27T12:34:56Z"
    }
    ```

### 21. Delete an event
- **Method**: DELETE
- **URL**: `/api/events/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "message": "Event deleted successfully"
    }
    ```

## News and Articles

### 22. Create a news article
- **Method**: POST
- **URL**: `/api/news`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "New Alumni Event",
        "content": "We are excited to announce a new event for our alumni."
    }
    ```
- **Response**:
    ```json
    {
        "_id": "news_id",
        "title": "New Alumni Event",
        "content": "We are excited to announce a new event for our alumni.",
        "createdBy": "user_id",
        "createdAt": "2024-07-27T12:34:56Z"
    }
    ```

### 23. Get all news articles
- **Method**: GET
- **URL**: `/api/news`
- **Headers**: None
- **Response**:
    ```json
    [
        {
            "_id": "news_id",
            "title": "New Alumni Event",
            "content": "We are excited to announce a new event for our alumni.",
            "createdBy": "user_id",
            "createdAt": "2024-07-27T12:34:56Z"
        },
    
    ]
    ```

### 24. Get news article by ID
- **Method**: GET
- **URL**: `/api/news/:id`
- **Headers**: None
- **Response**:
    ```json
    {
        "_id": "news_id",
        "title": "New Alumni Event",
        "content": "We are excited to announce a new event for our alumni.",
        "createdBy": "user_id",
        "createdAt": "2024-07-27T12:34:56Z"
    }
    ```

### 25. Subscribe to newsletter
- **Method**: POST
- **URL**: `/api/news/subscribe`
- **Headers**: None
- **Body**:
    ```json
    {
        "email": "john@example.com"
    }
    ```
- **Response**:
    ```json
    {
        "message": "Subscribed to newsletter successfully"
    }
    ```

## Donations and Fundraising

### 26. Create a fundraising campaign
- **Method**: POST
- **URL**: `/api/campaigns`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "Scholarship Fund",
        "description": "Raising funds for student scholarships.",
        "targetAmount": 10000,
        "startDate": "2024-08-01",
        "endDate": "2024-12-31"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "campaign_id",
        "title": "Scholarship Fund",
        "description": "Raising funds for student scholarships.",
        "targetAmount": 10000,
        "startDate": "2024-08-01",
        "endDate": "2024-12-31",
        "createdBy": "user_id"
    }
    ```

### 27. Get all fundraising campaigns
- **Method**: GET
- **URL**: `/api/campaigns`
- **Headers**: None
- **Response**:
    ```json
    [
        {
            "_id": "campaign_id",
            "title": "Scholarship Fund",
            "description": "Raising funds for student scholarships.",
            "targetAmount": 10000,
            "startDate": "2024-08-01",
            "endDate": "2024-12-31",
            "createdBy": "user_id"
        },
    
    ]
    ```

### 28. Donate to a campaign
- **Method**: POST
- **URL**: `/api/campaigns/donate`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "campaignId": "campaign_id",
        "amount": 100,
        "message": "Keep up the good work!"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "donation_id",
        "campaignId": "campaign_id",
        "userId": "user_id",
        "amount": 100,
        "message": "Keep up the good work!",
        "timestamp": "2024-07-27T12:34:56Z"
    }
    ```

## Media Gallery

### 29. Upload media
- **Method**: POST
- **URL**: `/api/media/upload`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**: `multipart/form-data`
    - `media`: File
    - `data`: JSON
        ```json
        {
            "title": "Event Photo",
            "description": "Photo from the alumni event",
            "fileType": "image"
        }
        ```
- **Response**:
    ```json
    {
        "_id": "media_id",
        "title": "Event Photo",
        "description": "Photo from the alumni event",
        "fileType": "image",
        "path": "path_to_uploaded_file",
        "uploadedBy": "user_id",
        "uploadedAt": "2024-07-27T12:34:56Z"
    }
    ```

### 30. Get media gallery


- **Method**: GET
- **URL**: `/api/media`
- **Headers**: None
- **Response**:
    ```json
    [
        {
            "_id": "media_id",
            "title": "Event Photo",
            "description": "Photo from the alumni event",
            "fileType": "image",
            "path": "path_to_uploaded_file",
            "uploadedBy": "user_id",
            "uploadedAt": "2024-07-27T12:34:56Z"
        },

    ]
    ```

### 31. Delete media
- **Method**: DELETE
- **URL**: `/api/media/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "message": "Media deleted successfully"
    }
    ```

Sure! Here is a revised version of the CRUD operations for the API endpoints:

### 32. **Admin Authentication**
- **Method**: POST
- **URL**: `/api/admin/login`
- **Body**:
    ```json
    {
        "email": "admin@example.com",
        "password": "adminpassword"
    }
    ```
- **Response**:
    ```json
    {
        "token": "jwt_token"
    }
    ```

### 33. **Create Alumni Profile**
- **Method**: POST
- **URL**: `/api/admin/alumni`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "name": "Jane Doe",
        "email": "jane@example.com",
        "graduationYear": "2021",
        "fieldOfStudy": "Business Administration"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "user_id",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "role": "alumni",
        "graduationYear": "2021",
        "fieldOfStudy": "Business Administration"
    }
    ```

### 34. **Get Alumni Profiles**
- **Method**: GET
- **URL**: `/api/alumni`
- **Response**:
    ```json
    {
        "success": true,
        "data": [
            {
                "id": "1",
                "name": "John Doe",
                "graduationYear": "2020",
                "degree": "BSc Computer Science",
                "email": "john.doe@example.com",
                "phone": "123-456-7890"
            }
        ]
    }
    ```

### 35. **Update Alumni Profile**
- **Method**: PUT
- **URL**: `/api/alumni/:id`
- **Description**: Updates a specific alumni profile.
- **Request Parameters**: 
    - `:id` - The ID of the alumni profile to update.
- **Body**:
    ```json
    {
        "name": "Johnathan Doe",
        "graduationYear": "2021",
        "degree": "MSc Computer Science",
        "email": "johnathan.doe@example.com",
        "phone": "098-765-4321"
    }
    ```
- **Response**:
    ```json
    {
        "success": true,
        "data": {
            "id": "1",
            "name": "Johnathan Doe",
            "graduationYear": "2021",
            "degree": "MSc Computer Science",
            "email": "johnathan.doe@example.com",
            "phone": "098-765-4321"
        }
    }
    ```

### 36. **Delete Alumni Profile**
- **Method**: DELETE
- **URL**: `/api/alumni/:id`
- **Description**: Deletes a specific alumni profile.
- **Request Parameters**:
    - `:id` - The ID of the alumni profile to delete.
- **Response**:
    ```json
    {
        "success": true,
        "message": "Profile deleted successfully"
    }
    ```

### 37. **Get Admin Analytics**
- **Method**: GET
- **URL**: `/api/admin/analytics`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "totalAlumni": 100,
        "totalEvents": 10,
        "totalDonations": 5000,
        "totalMediaUploads": 50
    }
    ```

## CRUD for Events

### 38. **Create Event**
- **Method**: POST
- **URL**: `/api/events/create`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "Alumni Meetup",
        "description": "A meetup for all alumni members.",
        "date": "2024-09-01T18:00:00Z",
        "location": "123 Main St, City"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "event_id",
        "title": "Alumni Meetup",
        "description": "A meetup for all alumni members.",
        "date": "2024-09-01T18:00:00Z",
        "location": "123 Main St, City",
        "createdBy": "admin_id"
    }
    ```

### 39. **Get All Events**
- **Method**: GET
- **URL**: `/api/events`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    [
        {
            "_id": "event_id",
            "title": "Alumni Meetup",
            "description": "A meetup for all alumni members.",
            "date": "2024-09-01T18:00:00Z",
            "location": "123 Main St, City",
            "createdBy": "admin_id"
        }
    ]
    ```

### 40. **Get Event by ID**
- **Method**: GET
- **URL**: `/api/events/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "_id": "event_id",
        "title": "Alumni Meetup",
        "description": "A meetup for all alumni members.",
        "date": "2024-09-01T18:00:00Z",
        "location": "123 Main St, City",
        "createdBy": "admin_id"
    }
    ```

### 41. **respond to an  Event**
- **Method**: POST
- **URL**: `/api/events/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "Updated Event Title",
        "description": "Updated description",
        "date": "2024-09-02T18:00:00Z",
        "location": "456 Main St, City"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "event_id",
        "title": "Updated Event Title",
        "description": "Updated description",
        "date": "2024-09-02T18:00:00Z",
        "location": "456 Main St, City",
        "createdBy": "admin_id",
        "updatedAt": "2024-07-27T12:34:56Z"
    }
    ```

### 41. **Update Event**
- **Method**: PUT
- **URL**: `/api/events/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "Updated Event Title",
        "description": "Updated description",
        "date": "2024-09-02T18:00:00Z",
        "location": "456 Main St, City"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "event_id",
        "title": "Updated Event Title",
        "description": "Updated description",
        "date": "2024-09-02T18:00:00Z",
        "location": "456 Main St, City",
        "createdBy": "admin_id",
        "updatedAt": "2024-07-27T12:34:56Z"
    }
    ```

### 42. **Delete Event**
- **Method**: DELETE
- **URL**: `/api/admin/events/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "message": "Event deleted successfully"
    }
    ```

## CRUD for News

### 43. **Create News Article**
- **Method**: POST
- **URL**: `/api/admin/news`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "New Alumni Event",
        "content": "We are excited to announce a new event for our alumni."
    }
    ```
- **Response**:
    ```json
    {
        "_id": "news_id",
        "title": "New Alumni Event",
        "content": "We are excited to announce a new event for our alumni.",
        "createdBy": "admin_id",
        "createdAt": "2024-07-27T12:34:56Z"
    }
    ```

### 44. **Get All News Articles**
- **Method**: GET
- **URL**: `/api/admin/news`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    [
        {
            "_id": "news_id",
            "title": "New Alumni Event",
            "content": "We are excited to announce a new event for our alumni.",
            "createdBy": "admin_id",
            "createdAt": "2024-07-27T12:34:56Z"
        }
    ]
    ```

### 45. **Get News Article by ID**
- **Method**: GET
- **URL**: `/api/admin/news/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "_id": "news_id",
        "title": "New Alumni Event",
        "content": "We are excited to announce a new event for our alumni.",
        "createdBy": "admin_id",
        "createdAt": "2024-07-27T12:34:56Z"
    }
    ```

### 46. **Update News Article**
- **Method**: PUT
- **URL**: `/api/admin/news/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**:
    ```json
    {
        "title": "Updated News Title",
        "content": "Updated content"
    }
    ```
- **Response**:
    ```json
    {
        "_id": "news_id",
        "title": "Updated News Title",
        "content": "Updated content",
        "createdBy": "admin_id",
        "updatedAt": "2024-07-27T12:34:56Z"
    }
    ```

### 47. **Delete News Article**
- **Method**: DELETE
- **URL**: `/api/admin/news/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "message": "News article deleted successfully"
    }
    ```

## CRUD for Media

### 48. **Upload Media**
- **Method**: POST
- **URL**: `/api/admin/media`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Body**: `multipart/form-data`
    - **Form Data**:
        - `media`: File
        - `data`: JSON
            ```json
            {
                "title": "Event Photo",
                "description": "Photo from the alumni event",
                "fileType": "image"
            }
            ```
- **Response**:
    ```json
    {
        "_id": "media_id",
        "title": "Event Photo",
        "description": "Photo from the alumni event",
        "fileType": "image",
        "path": "path_to_uploaded_file",
        "uploadedBy": "admin_id",
        "uploadedAt": "2024-07-27T12:34:56Z"
    }
    ```

### 49. **Get Media Gallery**
- **Method**: GET
- **URL**: `/api/admin/media`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    [
        {
            "_id": "media_id",
            "title": "Event Photo",
            "description": "Photo from the alumni event",
            "fileType": "image",
            "path": "path_to_uploaded_file",
            "uploadedBy": "admin_id",
            "uploadedAt": "2024-07-27T12:34:56Z"
        }
    ]
    ```

### 50. **Delete Media**
- **Method**: DELETE
- **URL**: `/api/admin/media/:id`
- **Headers**: 
    ```
    Authorization: Bearer <jwt_token>
    ```
- **Response**:
    ```json
    {
        "message": "Media deleted successfully"
    }
    ```
JOB CRUD OPERATION

## JOB Dashboard


### 51. **Get All Jobs**

- **URL:** `/api/jobs/`
- **Method:** `GET`
- **Description:** Retrieve a list of all job postings.
- **Response:**
  - **Success (200 OK):**
    ```json
    [
      {
        "title": "Software Engineer",
        "description": "Develop and maintain software applications.",
        "companyName": "Tech Corp",
        "location": "San Francisco, CA",
        "salaryRange": "$100,000 - $120,000",
        "employmentType": "full-time",
        "postedBy": "60d5f8b2c5f8b3d1a5f6e3a4", 
        "postedDate": "2024-08-15T00:00:00.000Z",
        "applicationDeadline": "2024-09-15T00:00:00.000Z",
        "createdAt": "2024-08-15T00:00:00.000Z",
        "updatedAt": "2024-08-15T00:00:00.000Z",
        "_id": "60d5f8b2c5f8b3d1a5f6e3a4"
      },
      
    ]
    ```
  - **Error (500 Internal Server Error):**
    ```json
    {
      "error": "Unable to fetch jobs."
    }
    ```

### 52. **Create a New Job**

- **URL:** `/api/jobs/create`
- **Method:** `POST`
- **Description:** Create a new job posting.
- **Request Body:**
  ```json
  {
    "title": "Software Engineer",
    "description": "Develop and maintain software applications.",
    "companyName": "Tech Corp",
    "location": "San Francisco, CA",
    "salaryRange": "$100,000 - $120,000",
    "employmentType": "full-time",
    "applicationDeadline": "2024-09-15T00:00:00.000Z"
  }
  ```
- **Response:**
  - **Success (201 Created):**
    ```json
    {
      "message": "Job created successfully.",
      "job": {
         "title": "Junior Web Developer",
    "description": "Assist in the development of web applications.",
    "companyName": "Tech Innovators",
    "location": "Remote",
    "salaryRange": "$50,000 - $60,000",
    "employmentType": "full-time",
    "postedBy": "66bd559973a57ef3549a2412",
    "applicationDeadline": "2024-09-30T00:00:00.000Z",
    "_id": "66bf4376613bf2b766050187",
    "postedDate": "2024-08-16T12:17:58.930Z",
    "createdAt": "2024-08-16T12:17:58.931Z",
    "updatedAt": "2024-08-16T12:17:58.931Z",
        "_id": "60d5f8b2c5f8b3d1a5f6e3a4"
      }
    }
    ```
  - **Error (400 Bad Request):**
    ```json
    {
      "error": "Validation error. Please check your input."
    }
    ```

### 53. **Update a Job**

- **URL:** `/api/jobs/:id`
- **Method:** `PUT`
- **Description:** Update an existing job posting by ID.
- **Request Body:**
  ```json
  {
    "title": "Senior Software Engineer",
    "description": "Lead software development projects.",
    "salaryRange": "$120,000 - $140,000",
    "applicationDeadline": "2024-09-30T00:00:00.000Z"
  }
  ```
- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "message": "Job updated successfully.",
      "job": {
        "title": "Senior Software Engineer",
        "description": "Lead software development projects.",
        "companyName": "Tech Corp",
        "location": "San Francisco, CA",
        "salaryRange": "$120,000 - $140,000",
        "employmentType": "full-time",
        "postedBy": "60d5f8b2c5f8b3d1a5f6e3a4", 
        "postedDate": "2024-08-15T00:00:00.000Z",
        "applicationDeadline": "2024-09-30T00:00:00.000Z",
        "createdAt": "2024-08-15T00:00:00.000Z",
        "updatedAt": "2024-08-16T00:00:00.000Z",
        "_id": "60d5f8b2c5f8b3d1a5f6e3a4"
      }
    }
    ```
  - **Error (400 Bad Request):**
    ```json
    {
      "error": "Validation error. Please check your input."
    }
    ```

### 54. **Delete a Job**

- **URL:** `/api/jobs/:id`
- **Method:** `DELETE`
- **Description:** Delete a job posting by ID.
- **Response:**
  - **Success (200 OK):**
    ```json
    {
      "message": "Job deleted successfully."
    }
    ```
  - **Error (404 Not Found):**
    ```json
    {
      "error": "Job not found."
    }
    ```

## Donation API Endpoints

 ### 54. **Create a New Donation**
   - **Endpoint**: `POST /api/donations`
   - **Description**: Create a donation for a campaign.
   - **Body**: 
     - `campaignId` (String, required)
     - `amount` (Number, required)
   - **Response**: 
     - `201 Created`: Returns the created donation.
     - `404 Not Found`: Campaign not found.
     - `500 Internal Server Error`: Server error.

 ### 55. **Get Donations by Campaign**
   - **Endpoint**: `GET /api/campaigns/:campaignId/donations`
   - **Description**: Get all donations for a campaign with the total amount raised.
   - **Response**:
     - `200 OK`: Returns `totalAmountRaised` and donation list.
     - `500 Internal Server Error`: Server error.

 ### 56. **Get Donations by User**
   - **Endpoint**: `GET /api/users/me/donations`
   - **Description**: Get all donations by the authenticated user with the total amount donated.
   - **Response**:
     - `200 OK`: Returns `totalAmountDonated` and donation list.
     - `500 Internal Server Error`: Server error.


### Authentication & Authorization
- **Note**: All endpoints require user authentication.

---






