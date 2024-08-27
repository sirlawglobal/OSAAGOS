this is for the admin dashboard

---

## Admin Routes

### Events

- **Create Event**
  - `POST /api/admin/events`
  - Create a new event.
  
- **Get All Events**
  - `GET /api/admin/events`
  - Retrieve all events.

- **Get Event by ID**
  - `GET /api/admin/events/:id`
  - Retrieve a specific event by ID.

- **Update Event by ID**
  - `PUT /api/admin/events/:id`
  - Update a specific event by ID.

- **Delete Event by ID**
  - `DELETE /api/admin/events/:id`
  - Delete a specific event by ID.

### Alumni Profiles

- **Create Alumni Profile**
  - `POST /api/admin/alumni`
  - Create a new alumni profile.

- **Get All Alumni Profiles**
  - `GET /api/admin/alumni`
  - Retrieve all alumni profiles.

- **Get Alumni Profile by ID**
  - `GET /api/admin/alumni/:id`
  - Retrieve a specific alumni profile by ID.

- **Update Alumni Profile by ID**
  - `PUT /api/admin/alumni/:id`
  - Update a specific alumni profile by ID.

- **Delete Alumni Profile by ID**
  - `DELETE /api/admin/alumni/:id`
  - Delete a specific alumni profile by ID.

### Forum

- **Create Forum**
  - `POST /api/admin/forum`
  - Create a new forum.

- **Get All Forums**
  - `GET /api/admin/forum`
  - Retrieve all forums.

- **Get Forum by ID**
  - `GET /api/admin/forum/:id`
  - Retrieve a specific forum by ID.

- **Update Forum by ID**
  - `PUT /api/admin/forum/:id`
  - Update a specific forum by ID.

- **Delete Forum by ID**
  - `DELETE /api/admin/forum/:id`
  - Delete a specific forum by ID.

- **Admin Approving forum**
  - `POST /api/admin/forum/:forum/approve/`
  - APProving a forum.

- **Admin denying forum**
  - `POST /api/admin/forum/:forum/deny`
  - unapproving a forum.


- **Admin creating forum post**
  - `POST /api/admin//forums/:forumId/posts`
  -  creating a forum post.
  

- **Admin getting all posts in a  forum**
  - `POST /api/admin//forums/:forumId/posts`
  -  getting all the posts in a forum.


- **Admin getting post by ID in a  forum**
  - `POST /api/admin//forums/:forumId/posts`
  -  getting posts by Id in a forum.


- **Admin updating post by ID in a  forum**
  - `POST /api/admin/forums/posts/:postId`
  - updating posts by Id in a forum.


- **Admin deleting post by ID in a  forum**
  - `POST /api/admin/forums/posts/:postId`
  - updating posts by Id in a forum.


### Campaign

- **Create Campaign**
  - `POST /api/admin/campaign`
  - Create a new campaign.

- **Get All Campaigns**
  - `GET /api/admin/campaign`
  - Retrieve all campaigns.

- **Get Campaign by ID**
  - `GET /api/admin/campaign/:id`
  - Retrieve a specific campaign by ID.

- **Update Campaign by ID**
  - `PUT /api/admin/campaign/:id`
  - Update a specific campaign by ID.

- **Delete Campaign by ID**
  - `DELETE /api/admin/campaign/:id`
  - Delete a specific campaign by ID.

### Donation

- **Create Donation**
  - `POST /api/admin/donation`
  - Create a new donation.

- **Get All Donations**
  - `GET /api/admin/donation`
  - Retrieve all donations.

- **Get Donation by ID**
  - `GET /api/admin/donation/:id`
  - Retrieve a specific donation by ID.

- **Update Donation by ID**
  - `PUT /api/admin/donation/:id`
  - Update a specific donation by ID.

- **Delete Donation by ID**
  - `DELETE /api/admin/donation/:id`
  - Delete a specific donation by ID.

### Group

- **Create Group**
  - `POST /api/admin/group`
  - Create a new group.

- **Get All Groups**
  - `GET /api/admin/group`
  - Retrieve all groups.

- **Get Group by ID**
  - `GET /api/admin/group/:id`
  - Retrieve a specific group by ID.

- **Update Group by ID**
  - `PUT /api/admin/group/:id`
  - Update a specific group by ID.

- **Delete Group by ID**
  - `DELETE /api/admin/group/:id`
  - Delete a specific group by ID.

- **Admin Approving group_creation**
  - `POST /api/admin/group/:id/admin/group/:group/approve`
  - APProving a group.

- **Admin denying group_creation**
  - `POST /api/admin/group/:id/admin/group/:group/deny`
  - unapproving a group .

- **Admin Approving joining request to a group**
  - `POST /api/admin//groups/:groupId/approveJoin/:userId`
  - APProving  joing a group.


- **Admin adding member to a group**
  - `POST /groups/:groupId/members/:userId`
  - adding member to a  group .

- **Admin removing member to a group**
  - `DELETE /groups/:groupId/members/:userId`
  - adding member to a  group .

- **Admin getting all members of a group**
  - `DELETE /groups/:groupId/members`
  - adding member to a  group .


### Post

- **Create Post**
  - `POST /api/admin/post`
  - Create a new post.

- **Get All Posts**
  - `GET /api/admin/post`
  - Retrieve all posts.

- **Get Post by ID**
  - `GET /api/admin/post/:id`
  - Retrieve a specific post by ID.

- **Update Post by ID**
  - `PUT /api/admin/post/:id`
  - Update a specific post by ID.

- **Delete Post by ID**
  - `DELETE /api/admin/post/:id`
  - Delete a specific post by ID.

### News

- **Create News**
  - `POST /api/admin/news`
  - Create a new news entry.

- **Get All News**
  - `GET /api/admin/news`
  - Retrieve all news entries.

- **Get News by ID**
  - `GET /api/admin/news/:id`
  - Retrieve a specific news entry by ID.

- **Update News by ID**
  - `PUT /api/admin/news/:id`
  - Update a specific news entry by ID.

- **Delete News by ID**
  - `DELETE /api/admin/news/:id`
  - Delete a specific news entry by ID.

### Jobs

- **Create Job**
  - `POST /api/admin/jobs`
  - Create a new job listing.

- **Get All Jobs**
  - `GET /api/admin/jobs`
  - Retrieve all job listings.

- **Get Job by ID**
  - `GET /api/admin/jobs/:id`
  - Retrieve a specific job listing by ID.

- **Update Job by ID**
  - `PUT /api/admin/jobs/:id`
  - Update a specific job listing by ID.

- **Delete Job by ID**
  - `DELETE /api/admin/jobs/:id`
  - Delete a specific job listing by ID.

### Users

- **Fetch All User Profiles**
  - `GET /api/admin/users`
  - Retrieve all user profiles.

- **Fetch User Profiles**
  - `GET /api/admin/usersprofile`
  - Retrieve detailed user profiles.

### Media

- **Create Media**
  - `POST /api/admin/media`
  - Create a new media entry.

- **Get All Media**
  - `GET /api/admin/media`
  - Retrieve all media entries.

- **Get Media by ID**
  - `GET /api/admin/media/:id`
  - Retrieve a specific media entry by ID.

- **Update Media by ID**
  - `PUT /api/admin/media/:id`
  - Update a specific media entry by ID.

- **Delete Media by ID**
  - `DELETE /api/admin/media/:id`
  - Delete a specific media entry by ID.

### Analytics

- **Get Analytics**
  - `GET /api/admin/getAnalytics`
  - Retrieve analytics data.

