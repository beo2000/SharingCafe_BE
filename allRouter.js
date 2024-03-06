import express from 'express';
import * as admController from './APP/Controller/adminController.js';
import * as userController from './APP/Controller/userController.js';
import * as interestController from './APP/Controller/interestController.js';
import * as eventController from './APP/Controller/EventController.js';
import * as blogController from './APP/Controller/blogController.js';
import * as matchController from './APP/Controller/matchController.js';
import * as modController from './APP/Controller/modController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Admin section
 *     description: API endpoints for admin
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     in: header
 *     name: Authorization
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login only
 *     tags:
 *       - Admin section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 default: pass
 *           example:
 *             email: johndoe@gmail.com
 *             password: pass
 *     responses:
 *       '200':
 *         description: The details of admin after login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: your_access_token
 *       '404':
 *         description: Admin not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Admin not found
 */
/**
 * @swagger
 * /api/admin/statics:
 *   get:
 *     summary: Get statistics for admin
 *     description: Retrieve statistics data for the admin.
 *     tags:
 *       - Admin section
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * tags:
 *   - name: Admin section
 *
 * /api/admin/users:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all admin users
 *     description: Retrieve a list of all admin users.
 *     tags:
 *       - Admin section
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 users:
 *                   - userId: 1
 *                     username: "admin1"
 *                   - userId: 2
 *                     username: "admin2"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.post('/api/admin/login', admController.loginAdmin);
router.get('/api/admin/statics', admController.getStatics);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login User
 *     description: Endpoint for user login
 *     tags:
 *       - User section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: janedoe@gmail.com
 *               password:
 *                 type: string
 *                 example: pass
 *     responses:
 *       '200':
 *         description: Successful login
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/user/interest/{userInterestId}:
 *   get:
 *     summary: Get a specific user interest by ID
 *     tags:
 *       - User Section
 *     parameters:
 *       - in: path
 *         name: userInterestId
 *         required: true
 *         description: ID of the user interest
 *         schema:
 *           type: string
 *         example: your-user-interest-id
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               userInterestId: your-user-interest-id
 *               userId: your-user-id
 *               interest: Sample Interest
 *       '404':
 *         description: User interest not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/interest/{userInterestId}:
 *   put:
 *     summary: Update a specific user interest by ID
 *     tags:
 *       - User Section
 *     parameters:
 *       - in: path
 *         name: userInterestId
 *         required: true
 *         description: ID of the user interest to be updated
 *         schema:
 *           type: string
 *         example: your-user-interest-id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interest_id:
 *                 type: string
 *                 description: ID of the user interest to be updated
 *     responses:
 *       '200':
 *         description: User interest updated successfully
 *       '404':
 *         description: User interest not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user information by ID
 *     tags:
 *       - User Section
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *         example: 6150886b-5920-4884-8e43-d4efb62f89d3
 *     responses:
 *       '200':
 *         description: Successfully retrieved user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: ID of the user
 *                   example: 6150886b-5920-4884-8e43-d4efb62f89d3
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/interests/{userId}:
 *   get:
 *     summary: Get user interests by user ID
 *     tags:
 *       - User Section
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve interests
 *         schema:
 *           type: string
 *         example: 6150886b-5920-4884-8e43-d4efb62f89d3
 *     responses:
 *       '200':
 *         description: Successfully retrieved user interests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   interestId:
 *                     type: string
 *                     description: ID of the interest
 *                     example: your-interest-id
 *       '404':
 *         description: User not found or no interests available
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/interest:
 *   post:
 *     summary: Create a new user interest
 *     tags:
 *       - User Section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interest_id:
 *                 type: string
 *                 description: ID of the interest
 *                 example: 1805a210-afd7-4a87-ac4c-845bdfa37127
 *               user_id:
 *                 type: string
 *                 description: ID of the user
 *                 example: 6150886b-5920-4884-8e43-d4efb62f89d3
 *             required:
 *               - interest_id
 *               - user_id
 *     responses:
 *       '201':
 *         description: User interest created successfully
 *       '400':
 *         description: Bad request, missing required parameters
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/event/{eventId}:
 *   get:
 *     summary: Get information about a specific event by ID
 *     tags:
 *       - Event Section
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: string
 *         example: a73ca8fb-64a6-4b4a-9d09-620cd3aa11d8
 *     responses:
 *       '200':
 *         description: Successfully retrieved event information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 eventId:
 *                   type: string
 *                   description: ID of the event
 *                   example: a73ca8fb-64a6-4b4a-9d09-620cd3aa11d8
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
router.post('/api/user/login', userController.loginUser);
router.get('/api/user/:userId', userController.getUser);

router.post('/api/user/interest', userController.createInterest);
router.get('/api/user/interests/:userId', userController.getInterests);
router.get('/api/user/interest/:userInterestId', userController.getInterest);
router.put('/api/user/interest/:userInterestId', userController.updateInterest);
router.delete('/api/user/interest', userController.deleteInterest);

router.get('/api/user/events/:userId', userController.getMyEvents);
router.get('/api/user/events/interest/:interestId', userController.getEventsByInterest);
router.get('/api/user/blogs/interest/:interestId', userController.getBlogsByInterest);
/**
 * @swagger
 * /api/interest:
 *   get:
 *     summary: Get All Interests
 *     description: Retrieve a list of all interests.
 *     tags:
 *       - Interest Section
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   interest_id:
 *                     type: string
 *                     description: The ID of the interest.
 *                   name:
 *                     type: string
 *                     description: The name of the interest.
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp when the interest was created.
 *       '500':
 *         description: Internal Server Error
 *   post:
 *     summary: Create a new interest
 *     description: Create a new interest with the provided details.
 *     tags:
 *       - Interest Section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the interest.
 *             required:
 *               - name
 *           example:
 *             name: History v2
 *     responses:
 *       '201':
 *         description: Interest created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 interest_id:
 *                   type: string
 *                   description: The ID of the newly created interest.
 *                 name:
 *                   type: string
 *                   description: The name of the interest.
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the interest was created.
 *       '500':
 *         description: Internal Server Error
 * /api/interest/{interestId}:
 *   get:
 *     summary: Get an interest by ID
 *     description: Retrieve the details of a specific interest by its ID.
 *     tags:
 *       - Interest Section
 *     parameters:
 *       - in: path
 *         name: interestId
 *         required: true
 *         description: The ID of the interest.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 interest_id:
 *                   type: string
 *                   description: The ID of the interest.
 *                 name:
 *                   type: string
 *                   description: The name of the interest.
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the interest was created.
 *       '404':
 *         description: Interest not found
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/interest/{interest_id}:
 *   put:
 *     summary: Update an interest
 *     description: Update the details of an existing interest.
 *     tags:
 *       - Interest Section
 *     parameters:
 *       - in: path
 *         name: interest_id
 *         required: true
 *         description: The ID of the interest to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name for the interest.
 *             required:
 *               - name
 *           example:
 *             name: Updated History v2
 *     responses:
 *       '200':
 *         description: Interest updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 interest_id:
 *                   type: string
 *                   description: The ID of the updated interest.
 *                 name:
 *                   type: string
 *                   description: The updated name of the interest.
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp when the interest was updated.
 *       '404':
 *         description: Interest not found
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/interest:
 *   delete:
 *     summary: Delete interests
 *     description: Deletes interests based on the provided interest IDs.
 *     tags:
 *       - Interest Section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *           example: ["interestId1", "interestId2"]
 *     responses:
 *       200:
 *         description: Number of deleted interests
 *       500:
 *         description: Internal Server Error
 */
router.get('/api/interest', interestController.getInterests);
router.post('/api/interest', interestController.createInterest);
router.get('/api/interest/:interestId', interestController.getInterest);
router.put('/api/interest/:interestId', interestController.updateInterest);
router.delete('/api/interest', interestController.deleteInterest);

router.get('/api/admin/users', admController.getUsers);
/**
 * @swagger
 * /api/admin/user/{userId}:
 *   get:
 *     summary: Get admin user information by ID
 *     tags:
 *       - Admin section
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the admin user to retrieve
 *         schema:
 *           type: string
 *         example: 6150886b-5920-4884-8e43-d4efb62f89d3
 *     responses:
 *       '200':
 *         description: Successfully retrieved admin user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: ID of the admin user
 *                   example: 6150886b-5920-4884-8e43-d4efb62f89d3
 *       '404':
 *         description: Admin user not found
 *       '500':
 *         description: Internal server error
 */
router.get('/api/admin/user/:userId', admController.getUser);

// EVENT SECTION
//  Phân quyền Authorization -> Middleware handle -> Middleware ???
/**
 * @swagger
 * tags:
 *   - name: Event Section
 *     description: Operations related to events
 *
 * /api/event:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all events
 *     description: Retrieve a list of all events.
 *     tags:
 *       - Event Section
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 events:
 *                   - eventId: 1
 *                     eventName: "Event A"
 *                   - eventId: 2
 *                     eventName: "Event B"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * tags:
 *   - name: Event Section
 *     description: Operations related to events
 *
 * /api/event/{eventId}:
 *   parameters:
 *     - in: path
 *       name: eventId
 *       required: true
 *       description: ID of the event
 *       example: "50b415b6-b874-429c-9f31-56db62ff0c18"
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get event details
 *     description: Retrieve details for a specific event.
 *     tags:
 *       - Event Section
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 event:
 *                   eventId: "50b415b6-b874-429c-9f31-56db62ff0c18"
 *                   eventName: "Event A"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * tags:
 *   - name: Event Section
 *     description: Operations related to events
 *
 * /api/event:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new event
 *     description: Create a new event with the specified details.
 *     tags:
 *       - Event Section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             organizer_id: "6150886b-5920-4884-8e43-d4efb62f89d3"
 *             interest_id: "7ebbd78e-9589-45f2-af64-d6713ad2e0a9"
 *             title: "Nude"
 *             description: "Explore the latest advancements, insights, and collaborative discussions in the dynamic world of technology. Join us for a day of knowledge sharing, innovation, and community building as experts and enthusiasts come together to share ideas, trends, and experiences shaping the future of technology."
 *             time_of_event: "2024-02-29T17:00:00.000Z"
 *             location: "TP HCM"
 *             participants_count: 88
 *             is_approve: true
 *             background_img: "https://res.cloudinary.com/dvepci5on/image/upload/v1708879045/sharing-coffee-images-storage/B-Tech-Degree_pfkflz.jpg"
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Success
 *               data:
 *                 event:
 *                   eventId: "6150886b-5920-4884-8e43-d4efb62f89d3"  # Generated event ID
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */
router.get('/api/event', eventController.getEvents);
router.post('/api/event', eventController.createEvent);
router.get('/api/event/:eventId', eventController.getEvent);
router.put('/api/event/:eventId', eventController.updateEvent);
router.delete('/api/event/:eventId', eventController.deleteEvent);
/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get a list of blogs
 *     tags:
 *      - Blog Section
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - blogId: 1
 *                 title: Sample Blog 1
 *                 content: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *               - blogId: 2
 *                 title: Sample Blog 2
 *                 content: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/blog/{blogId}:
 *   get:
 *     summary: Get a specific blog by ID
 *     tags:
 *      - Blog Section
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *         example: fe4e88bd-7211-4285-918e-a1ba14cc946c
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               blogId: fe4e88bd-7211-4285-918e-a1ba14cc946c
 *               title: Sample Blog
 *               content: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Create a new blog
 *     tags:
 *      - Blog Section
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user creating the blog
 *                 example: "6150886b-5920-4884-8e43-d4efb62f89d5"
 *               interest_id:
 *                 type: string
 *                 description: ID of the interest for the blog
 *                 example: "7ebbd78e-9589-45f2-af64-d6713ad2e0a9"
 *               content:
 *                 type: string
 *                 description: Content of the blog
 *                 example: "Make your code better"
 *               title:
 *                 type: string
 *                 description: Title of the blog
 *                 example: "Sharing some traveling tips"
 *               image:
 *                 type: string
 *                 description: Image URL associated with the blog
 *                 example: "https://res.cloudinary.com/dvepci5on/image/upload/v1708879045/sharing-coffee-images-storage/B-Tech-Degree_pfkflz.jpg"
 *               likes_count:
 *                 type: integer
 *                 description: Count of likes for the blog
 *                 example: 10
 *               comments_count:
 *                 type: integer
 *                 description: Count of comments for the blog
 *                 example: 15
 *               is_approve:
 *                 type: boolean
 *                 description: Approval status of the blog
 *                 example: true
 *     responses:
 *       '201':
 *         description: Blog created successfully
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/blog/{blogId}:
 *   patch:
 *     summary: Update a specific blog by ID
 *     tags:
 *      - Blog Section
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *         example: fe4e88bd-7211-4285-918e-a1ba14cc946c
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user updating the blog
 *               content:
 *                 type: string
 *                 description: Updated content of the blog
 *               title:
 *                 type: string
 *                 description: Updated title of the blog
 *               image:
 *                 type: string
 *                 description: Updated image URL associated with the blog
 *               likes_count:
 *                 type: integer
 *                 description: Updated count of likes for the blog
 *               comments_count:
 *                 type: integer
 *                 description: Updated count of comments for the blog
 *               is_approve:
 *                 type: boolean
 *                 description: Updated approval status of the blog
 *     responses:
 *       '200':
 *         description: Blog updated successfully
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/blog/{blogId}:
 *   delete:
 *     summary: Delete a specific blog by ID
 *     tags:
 *       - Blog Section
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to be deleted
 *         schema:
 *           type: string
 *         example: fe4e88bd-7211-4285-918e-a1ba14cc946c
 *     responses:
 *       '204':
 *         description: Blog deleted successfully
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
router.get('/api/blog', blogController.getBlogs);
router.get('/api/blog/:blogId', blogController.getBlog);
router.post('/api/blog', blogController.createBlog);
router.put('/api/blog/:blogId', blogController.updateBlog);
router.delete('/api/blog/:blogId', blogController.deleteBlog);

router.post('/api/moderator/login', modController.loginMod);
router.put('/api/moderator/blog/:blogId', modController.censorBlog);
router.put('/api/moderator/event/:eventId', modController.censorEvent);

// MATCH SECTION
/**
 * @swagger
 * tags:
 *   name: MATCH SECTION
 *   description: API operations related to user matches
 */

/**
 * @swagger
 * /api/auth/matches-interest:
 *   get:
 *     summary: Get user matches by interests with pagination
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - MATCH SECTION
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: 1
 *         required: false
 *         type: integer
 *         default: 1
 *         minimum: 1
 *         maximum: 100
 *       - in: query
 *         name: offset
 *         description: 0
 *         required: false
 *         type: integer
 *         default: 0
 *         minimum: 0
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               message: Successfully retrieved user matches
 *               data:
 *                 matches: [user1, user2, user3]
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Internal Server Error
 */
router.get('api/auth/matches-interest', matchController.getUserMatchByInterest);
export default router;
