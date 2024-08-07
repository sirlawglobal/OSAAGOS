<<<<<<< HEAD
=======
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
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "alumni",
        "token": "jwt_token"
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
- **URL**: `/api/messages`
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
- **URL**: `/api/groups/join`
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

## Forum

### 12. Create a forum post
- **Method**: POST
- **URL**: `/api/forums`
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

### 13. Get all forum posts
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

### 14. Get a forum post by ID
- **Method**: GET
- **URL**: `/api/forums/:id`
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

### 15. Update a forum post
- **Method**: PUT
- **URL**: `/api/forums/:id`
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
- **URL**: `/api/forums/:id`
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

## Admin Dashboard

### 32. Admin authentication
- **Method**: POST
- **URL**: `/api/admin/login`
- **Headers**: None
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

### 33. Create alumni profile
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

    ### 33. **Get Alumni Profiles**
   - **Endpoint**: `GET /alumni`
   - **Description**: Retrieves all alumni profiles.
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
         },
       
       ]
     }
     ```

  ### 34. **Update Alumni Profile**
   - **Endpoint**: `PUT /alumni/:id`
   - **Description**: Updates a specific alumni profile.
   - **Request Parameters**: 
     - `:id` - The ID of the alumni profile to update.
   - **Request Body**:
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

  ### 35. **Delete Alumni Profile**
   - **Endpoint**: `DELETE /alumni/:id`
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

### 36. **Get admin analytics**
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

 ## CRUD for events
### 37. **Create Event**:
    - **Method**: POST
    - **URL**: `/api/admin/events`
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
### 38. **Get All Events**:
    - **Method**: GET
    - **URL**: `/api/admin/events`
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
            },
        
        ]
        ```
### 39. **Get Event by ID**:
    - **Method**: GET
    - **URL**: `/api/admin/events/:id`
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
### 40 **Update Event**:
    - **Method**: PUT
    - **URL**: `/api/admin/events/:id`
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
### 41 **Delete Event**:
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

## CRUD for news
### 42. **Create News Article**:
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
### 43. **Get All News Articles**:
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
            },
        
        ]
        ```
### 44.**Get News Article by ID**:
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
### 45. **Update News Article**:
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
### 46. **Delete News Article**:
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

 ## CRUD for media
### 47. **Upload Media**:
    - **Method**: POST
    - **URL**: `/api/admin/media`
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
            "uploadedBy": "admin_id",
            "uploadedAt": "2024-07-27T12:34:56Z"
        }
        ```
### 48.  **Get Media Gallery**:
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
            },
            
        ]
        ```
### 49. **Delete Media**:
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

50. Delete Media
Method: DELETE
URL: /api/admin/media/:id
Headers:
Authorization: Bearer <jwt_token>
Response:


{
    "message": "Media deleted successfully"
}

# Appendix

### Response Codes
- **200 OK**: Request succeeded
- **201 Created**: Resource created successfully
- **204 No Content**: Request succeeded, no content to return
- **400 Bad Request**: Invalid request
- **401 Unauthorized**: Authentication failed or user not logged in
- **403 Forbidden**: User does not have permission to access the resource
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server encountered an error

### Error Handling
- Errors will be returned in the following format:
    ```json
    {
        "error": "Error message"
    }
    ```

### Authentication
- Authentication is handled using JWT tokens. Include the token in the `Authorization` header of requests that require authentication:
    ```
    Authorization: Bearer <jwt_token>
    ```

### Roles and Permissions
- Users have roles such as "alumni" and "admin". Permissions are based on these roles.

This API specification provides endpoints for a comprehensive alumni management system, covering user management, forums, events, news, donations, media gallery, and an admin dashboard for managing these resources.

---
>>>>>>> 4ceb4b91b4fd46c2bd9dce291e054d5c5980fbe8
