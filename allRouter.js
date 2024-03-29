import express from 'express';
import * as admController from './APP/Controller/adminController.js';
import * as userController from './APP/Controller/userController.js';
import * as interestController from './APP/Controller/interestController.js';
import * as eventController from './APP/Controller/EventController.js';
import * as blogController from './APP/Controller/blogController.js';
import * as matchController from './APP/Controller/matchController.js';
import * as modController from './APP/Controller/modController.js';
import uploadCloud from './APP/middleware/uploadCloudImg.js';
import * as chatController from './APP/Controller/chatController.js';
import * as scheduleController from './APP/Controller/scheduleController.js';
import * as reportController from './APP/Controller/reportController.js';
import * as locationController from './APP/Controller/locationController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: ADMIN SECTION
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
 *       - ADMIN SECTION
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
 *       - ADMIN SECTION
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * tags:
 *   - name: ADMIN SECTION
 *
 * /api/admin/users:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all admin users
 *     description: Retrieve a list of all admin users.
 *     tags:
 *       - ADMIN SECTION
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
 * /api/user/register:
 *   post:
 *     summary: Register a User account
 *     description: Create a new User account
 *     tags:
 *       - USER SECTION
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
 *                 example: tienpmse140@gmail.com
 *               password:
 *                 type: string
 *                 example: pass
 *               user_name:
 *                 type: string
 *                 example: Huỳnh Minh Mẫn
 *               phone:
 *                 type: string
 *                 example: 012612375
 *               Bio:
 *                 type: Json
 *                 example: Chưa nghĩ ra được gì hay ho
 *     responses:
 *       '200':
 *         description: Registration successful
 *       '401':
 *         description: Registration failed - Invalid credentials
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login User
 *     description: Endpoint for user login
 *     tags:
 *       - USER SECTION
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
 *                 example: trongtp.user@gmail.com
 *               password:
 *                 type: string
 *                 example: User@123
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
 *       - USER SECTION
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
 *       - USER SECTION
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
 *       - USER SECTION
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
 *       - USER SECTION
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
 *       - USER SECTION
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
 *       - EVENT SECTION
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
/**
 * @swagger
 * /api/user/{userId}:
 *   put:
 *     summary: Update a user profile
 *     tags:
 *       - USER SECTION
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user profile to be updated
 *         schema:
 *           type: string
 *         example: f6fb30c7-7d61-48ae-8a59-05c53568847c
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_name:
 *                 type: string
 *                 description: Name of the user to be updated
 *                 example: John Smith
 *               password:
 *                 type: string
 *                 description: User account password to be updated
 *                 example: 146759
 *               Bio:
 *                 type: json
 *                 description: User bio to be updated
 *                 example: I like fishing
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * tags:
 *   - name: USER SECTION
 *     description: Operations related to user authentication
 *
 * /api/auth/user/update-interests:
 *   put:
 *     summary: Update user interests
 *     description: Update or insert user interests based on the provided data.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - USER SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               interests:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     interest_id:
 *                       type: string
 *                       description: ID of the interest
 *     responses:
 *       200:
 *         description: Interests updated successfully
 *       400:
 *         description: Bad request - Invalid request body
 *       500:
 *         description: Internal server error
 */
router.put('/api/auth/user/update-interests', userController.upsertInterests);
router.put(
  '/api/auth/user/update-unlike-topic',
  userController.upsertUnlikeTopics,
);
router.put(
  '/api/auth/user/update-personal-problem',
  userController.upsertPersonalProblems,
);
router.put(
  '/api/auth/user/update-favorite-drink',
  userController.upsertFavoriteDrinks,
);
router.put('/api/auth/user/update-free-time', userController.upsertFreeTimes);

router.post('/api/user/login', userController.loginUser);
router.get('/api/user/:userId', userController.getUser);
router.put('/api/user/:userId', userController.updateProfile);
router.put(
  '/api/user/avatar/:userId',
  uploadCloud.single('profile_avatar'),
  userController.updateAvatar,
);
router.post('/api/user/interest', userController.createInterest);
router.get('/api/user/interests/:userId', userController.getInterests);
router.get('/api/user/interest/:userInterestId', userController.getInterest);
router.put('/api/user/interest/:userInterestId', userController.updateInterest);
router.delete('/api/user/interest', userController.deleteInterest);
router.post('/api/user/register', userController.register);

/**
 * @swagger
 * /api/user/events/{userId}:
 *   get:
 *     summary: Get events created by specific user by ID
 *     tags:
 *       - USER EVENTS
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve events for
 *         schema:
 *           type: string
 *         example: 6150886b-5920-4884-8e43-d4efb62f89d5
 *     responses:
 *       '200':
 *         description: Successfully retrieved USER EVENTS
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: ID of the user
 *                   example: 6150886b-5920-4884-8e43-d4efb62f89d5
 *                 events:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       eventId:
 *                         type: string
 *                         description: ID of the event
 *                         example: 123456
 *                       eventName:
 *                         type: string
 *                         description: Name of the event
 *                         example: Example Event
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/events/interest/{interestId}:
 *   get:
 *     summary: Get events based on user's interest by ID
 *     tags:
 *       - USER EVENTS
 *     parameters:
 *       - in: path
 *         name: interestId
 *         required: true
 *         description: ID of the interest to retrieve events for
 *         schema:
 *           type: string
 *         example: abfa4293-5d5e-4a8b-a1d1-ce3cab1c1285
 *     responses:
 *       '200':
 *         description: Successfully retrieved events based on interest
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   eventId:
 *                     type: string
 *                     description: ID of the event
 *                     example: 123456
 *                   eventName:
 *                     type: string
 *                     description: Name of the event
 *                     example: Example Event
 *                   interestId:
 *                     type: string
 *                     description: ID of the interest
 *                     example: abfa4293-5d5e-4a8b-a1d1-ce3cab1c1285
 *       '404':
 *         description: Interest not found or no events available
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/blogs/interest/{interestId}:
 *   get:
 *     summary: Get blogs based on a specific interest ID
 *     tags:
 *       - USER BLOGS
 *     parameters:
 *       - in: path
 *         name: interestId
 *         required: true
 *         description: ID of the interest to retrieve blogs for
 *         schema:
 *           type: string
 *         example: 5ba1c54c-7610-4916-a4be-d55140952289
 *     responses:
 *       '200':
 *         description: Successfully retrieved blogs based on the interest ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   blogId:
 *                     type: string
 *                     description: ID of the blog
 *                     example: 123456
 *                   blogTitle:
 *                     type: string
 *                     description: Title of the blog
 *                     example: Example Blog
 *                   author:
 *                     type: string
 *                     description: Author of the blog
 *                     example: John Doe
 *       '404':
 *         description: Blogs not found for the specified interest
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/events/suggest/{userId}:
 *   get:
 *     summary: Get suggested events for a user
 *     tags:
 *       - USER EVENTS
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to get suggested events for
 *         schema:
 *           type: string
 *         example: 6150886b-5920-4884-8e43-d4efb62f89d4
 *     responses:
 *       '200':
 *         description: Successfully retrieved suggested events for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   eventId:
 *                     type: string
 *                     description: ID of the event
 *                     example: 789012
 *                   eventName:
 *                     type: string
 *                     description: Name of the event
 *                     example: Example Event
 *                   eventDate:
 *                     type: string
 *                     format: date
 *                     description: Date of the event
 *                     example: 2022-12-01
 *       '404':
 *         description: Suggested events not found for the specified user
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/user/events/{userId}:
 *   get:
 *     summary: Get all events created by a user
 *     tags:
 *       - USER EVENTS
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to get all events created by
 *         schema:
 *           type: string
 *         example: 6150886b-5920-4884-8e43-d4efb62f89d5
 *     responses:
 *       '200':
 *         description: Successfully retrieved all events created by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   eventId:
 *                     type: string
 *                     description: ID of the event
 *                     example: 789012
 *                   eventName:
 *                     type: string
 *                     description: Name of the event
 *                     example: Example Event
 *                   eventDate:
 *                     type: string
 *                     format: date
 *                     description: Date of the event
 *                     example: 2022-12-01
 *       '404':
 *         description: Suggested events not found for the specified user
 *       '500':
 *         description: Internal server error
 */
router.get('/api/user/events/:userId', userController.getMyEvents);
router.get(
  '/api/user/events/interest/:interestId',
  userController.getEventsByInterest,
);
router.get(
  '/api/user/blogs/interest/:interestId',
  userController.getBlogsByInterest,
);
router.get('/api/user/events/suggest/:userId', userController.getSuggestEvent);
/**
 * @swagger
 * /api/user/events/suggest/{userId}:
 *   get:
 *     summary: Get events for user base on interest
 *     tags:
 *       - USER EVENTS
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve events for
 *         schema:
 *           type: string
 *         example: 6150886b-5920-4884-8e43-d4efb62f89d4
 *     responses:
 *       "200":
 *         description: Successfully retrieved events based on the user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   eventId:
 *                     type: string
 *                     description: ID of the event
 *                     example: 123456
 *                   eventTitle:
 *                     type: string
 *                     description: Title of the event
 *                     example: Example Event
 *                   author:
 *                     type: string
 *                     description: Author of the event
 *                     example: John Doe
 *       "404":
 *         description: Events not found for the specified user
 *       "500":
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/interest:
 *   get:
 *     summary: Get All Interests
 *     description: Retrieve a list of all interests.
 *     tags:
 *       - INTEREST SECTION
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
 *       - INTEREST SECTION
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
 *             parent_interest_id: d637c554-1153-4a40-96fc-893941da1c2e
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
 *                 parent_interest_id:
 *                   type: string
 *                   description: The ID of the parent interest (optional)
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
 *       - INTEREST SECTION
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
 *       - INTEREST SECTION
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
 *                 description: Name of the interest
 *                 example: Văn mẫu
 *               parent_interest_id:
 *                 type: string
 *                 description: Id of the parent interest
 *                 example: b95bbd38-a3c1-4aa3-818e-55ad0d408bd3
 *               image:
 *                 type: string
 *                 description: Updated image URL associated with the interest
 *                 example: https://vcdn-vnexpress.vnecdn.net/2023/09/09/VNE-Planet-4768-1694245805.jpg
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
 *       - INTEREST SECTION
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
/**
 * @swagger
 * /api/interests/toppick:
 *   get:
 *     summary: Get Interest list with number of chose
 *     description: Retrieve a list of all interests.
 *     tags:
 *       - INTEREST SECTION
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
 */
/**
 * @swagger
 * /api/interests/parent:
 *   get:
 *     summary: Get all parent Interest list
 *     description: Retrieve a list of all parent interests.
 *     tags:
 *       - INTEREST SECTION
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
 */
/**
 * @swagger
 * tags:
 *   - name: INTEREST SECTION
 *     description: Operations related to interests
 *
 * /api/interest/count/blog:
 *   get:
 *     summary: Count blogs by interest
 *     description: Retrieve the count of blogs associated with each interest.
 *     tags:
 *       - INTEREST SECTION
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - interest_id: 1
 *                   parent_id: null
 *                   blog_count: 10
 *                 - interest_id: 2
 *                   parent_id: 1
 *                   blog_count: 5
 *       500:
 *         description: Internal server error
 */
router.get('/api/interest', interestController.getInterests);
router.post('/api/interest', interestController.createInterest);
router.get('/api/interest/:interestId', interestController.getInterest);
router.put('/api/interest/:interestId', interestController.updateInterest);
router.put(
  '/api/interest/image/:interestId',
  uploadCloud.single('image'),
  interestController.updateImage,
);
router.delete('/api/interest', interestController.deleteInterest);
router.get('/api/interests/toppick', interestController.getToppick);
router.get('/api/interests/parent', interestController.getParentInterests);
router.get('/api/admin/users', admController.getUsers);
router.get('/api/interest/count/blog', interestController.countBlogByInterest);
/**
 * @swagger
 * /api/admin/user/{userId}:
 *   get:
 *     summary: Get admin user information by ID
 *     tags:
 *       - ADMIN SECTION
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
router.put('/api/admin/user/:userId', admController.updateUserStatus);
router.get('api/');

// EVENT SECTION
//  Phân quyền Authorization -> Middleware handle -> Middleware ???
/**
 * @swagger
 * tags:
 *   - name: EVENT SECTION
 *     description: Operations related to events
 *
 * /api/event:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     summary: Get all events
 *     description: Retrieve a list of all events.
 *     tags:
 *       - EVENT SECTION
 *     parameters:
 *        - in: query
 *          name: title
 *          schema:
 *             type: string
 *          description: Title of Event
 *          example: competition
 *        - in: query
 *          name: date
 *          schema:
 *             type: string
 *          description: Time of Event
 *          example: 3/4/2024
 *        - in: query
 *          name: page
 *          schema:
 *             type: integer
 *          description: The number of page to skip before starting to collect the result set
 *          example: 1
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
 *   - name: EVENT SECTION
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
 *       - EVENT SECTION
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
 *   - name: EVENT SECTION
 *     description: Operations related to events
 *
 * /api/event:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     summary: Create a new event
 *     description: Create a new event with the specified details.
 *     tags:
 *       - EVENT SECTION
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
/**
 * @swagger
 * /api/event/{eventId}:
 *   put:
 *     summary: Update an event by ID
 *     tags:
 *       - EVENT SECTION
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event to update
 *         schema:
 *           type: string
 *         example: a73ca8fb-64a6-4b4a-9d09-620cd3aa11d8
 *       - in: body
 *         name: updateEventBody
 *         description: Request body to update an event
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             organizer_id:
 *               type: string
 *               description: ID of the event organizer
 *               example: 6150886b-5920-4884-8e43-d4efb62f89d3
 *             title:
 *               type: string
 *               description: Title of the event
 *               example: Cooking competition
 *             description:
 *               type: string
 *               description: Description of the event
 *               example: Challenge yourself with all other chefs around the city to earn yourself a Master Chef title
 *             time_of_event:
 *               type: string
 *               format: date-time
 *               description: Time of the event
 *               example: 2024-03-19T17:00:00.000Z
 *             location:
 *               type: string
 *               description: Location of the event
 *               example: Hue
 *             participants_count:
 *               type: integer
 *               description: Number of participants for the event
 *               example: 50
 *             is_approve:
 *               type: boolean
 *               description: Approval status of the event
 *               example: true
 *             created_at:
 *               type: string
 *               format: date-time
 *               description: Creation timestamp of the event
 *               example: 2024-02-25T09:50:34.977Z
 *             background_img:
 *               type: string
 *               description: URL of the background image for the event
 *               example: https://res.cloudinary.com/dvepci5on/image/upload/v1708879045/sharing-coffee-images-storage/B-Tech-Degree_pfkflz.jpg
 *             is_visible:
 *               type: boolean
 *               description: Visibility status of the event
 *               example: true
 *             interest_id:
 *               type: string
 *               description: ID of the event's interest
 *               example: 729b0a48-c9f2-450c-9482-7fbb129ba9db
 *             end_of_event:
 *               type: string
 *               format: date
 *               description: End date of the event
 *               example: 2024-03-10
 *     responses:
 *       '204':
 *         description: Event successfully updated
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @openapi
 * '/api/event/new/events':
 *   get:
 *     summary: Get a list of new events
 *     tags:
 *      - EVENT SECTION
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - eventId: 1
 *                 title: Sample Event 1
 *                 content: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *               - eventId: 2
 *                 title: Sample Event 2
 *                 content: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
 *       '500':
 *         description: Internal server error
 */
// /**
//  * @swagger
//  * '/api/event/search':
//  *  post:
//  *     summary: Get a list of events base on specific keyword
//  *     tags:
//  *     - EVENT SECTION
//  *     requestBody:
//  *       required: false
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 description: Keyword for searching
//  *                 example: competition
//  *               date:
//  *                 type: string
//  *                 description: Date for searching
//  *                 example: 3/7/2024
//  *
//  *     responses:
//  *       200:
//  *         description: Success
//  *         content:
//  *          application/json:
//  *            schema:
//  *              type: array
//  *              items:
//  *                type: object
//  *                properties:
//  *                  id:
//  *                    type: string
//  *                  title:
//  *                    type: string
//  *       400:
//  *         description: Bad request
//  */
/**
 * @swagger
 * /api/event/{eventId}:
 *   get:
 *     summary: Get a specific event by ID
 *     tags:
 *      - EVENT SECTION
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event
 *         schema:
 *           type: string
 *         example: 50b415b6-b874-429c-9f31-56db62ff0c12
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               eventId: 50b415b6-b874-429c-9f31-56db62ff0c12
 *               title: Sample Event
 *               content: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/event/{eventId}:
 *   delete:
 *     summary: Delete a specific event by ID
 *     tags:
 *       - EVENT SECTION
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event to be deleted
 *         schema:
 *           type: string
 *         example: 50b415b6-b874-429c-9f31-56db62ff0c12
 *     responses:
 *       '204':
 *         description: Event deleted successfully
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * '/api/event/popular/events':
 *  get:
 *     tags:
 *     - EVENT SECTION
 *     summary: Get a list of popular
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  title:
 *                    type: string
 *       400:
 *         description: Bad request
 */
router.get('/api/event', eventController.getEvents);
// router.post('/api/event/search', eventController.getEventsByName);
router.post('/api/event', eventController.createEvent);
router.get('/api/event/:eventId', eventController.getEvent);
router.put('/api/event/:eventId', eventController.updateEvent);
router.delete('/api/event/:eventId', eventController.deleteEvent);
router.get('/api/event/new/events', eventController.getNewEvents);
// router.post('/api/event/date', eventController.getEventsByDate);
router.get('/api/event/popular/events', eventController.getPopularEvents);
router.post(
  '/api/image',
  uploadCloud.single('background_img'),
  eventController.updateImage,
);
/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get a list of blogs
 *     tags:
 *      - BLOG SECTION
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: The number of page to skip before starting to collect the result set
 *          example: 1
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
 *      - BLOG SECTION
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
 *      - BLOG SECTION
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
 *   put:
 *     summary: Update a specific blog by ID
 *     tags:
 *      - BLOG SECTION
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
 *       - BLOG SECTION
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
/**
 * @swagger
 * /api/blog/new/blogs:
 *   get:
 *     summary: Get a list of new blogs
 *     tags:
 *      - BLOG SECTION
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
 * /api/blogs/popular:
 *   get:
 *     summary: Get a list of popular blogs
 *     tags:
 *      - BLOG SECTION
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
 * /api/blog/search:
 *  post:
 *     summary: Get a list of blogs base on specific keyword
 *     tags:
 *     - BLOG SECTION
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Keyword for searching
 *                 example: you
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  title:
 *                    type: string
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /api/blog/comment/{blogId}:
 *   get:
 *     summary: Get list of comment of a blog
 *     tags:
 *      - BLOG SECTION
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *         example: ae5b11b2-4e45-4a6d-b669-5ffb3661eda5
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               commentId: 20d6bf6a-89f1-404e-975a-3c6d5d6db570
 *               userId: Sample User
 *               content: Testing.
 *       '404':
 *         description: Blog not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/blog/comment:
 *   post:
 *     summary: Create a new comment
 *     tags:
 *      - BLOG SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user creating the comment
 *                 example: "7e8ed049-3b92-4fde-b84c-69d60256186f"
 *               blogId:
 *                 type: string
 *                 description: ID of the blog
 *                 example: "ae5b11b2-4e45-4a6d-b669-5ffb3661eda5"
 *               content:
 *                 type: string
 *                 description: Content of the blog
 *                 example: "Looking good"
 *     responses:
 *       '201':
 *         description: Comment created successfully
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/blog/comment/{commentId}:
 *   put:
 *     summary: Update a comment
 *     tags:
 *      - BLOG SECTION
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *         example: a5a8dcbe-824a-480c-9913-a761d585ca09
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: Content of the blog
 *                 example: "Looking good"
 *     responses:
 *       '201':
 *         description: Comment update successfully
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blog/comment/{commentId}:
 *   delete:
 *     summary: Delete a specific comment by ID
 *     tags:
 *       - BLOG SECTION
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: ID of the comment to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Comment deleted successfully
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blogs/like:
 *   post:
 *     summary: Like a blog
 *     tags:
 *      - BLOG SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: ID of the user creating the comment
 *                 example: "6ee3437a-8a2d-4769-8d89-cca128a6a086"
 *               blogId:
 *                 type: string
 *                 description: ID of the blog
 *                 example: "81a695ef-114c-4c4f-9a5e-5245ddeb75ae"
 *     responses:
 *       '201':
 *         description: Successfully like blog
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blogs/like:
 *   put:
 *     summary: Unlike a blog
 *     tags:
 *      - BLOG SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               like_blog_id:
 *                 type: string
 *                 description: ID
 *                 example: "19b18d03-83db-4840-b836-a8ab15ec5e44"
 *               blog_id:
 *                 type: string
 *                 description: ID of the blog
 *                 example: "6b0883ba-23c4-40a6-8e22-bda8011c4add"
 *     responses:
 *       '201':
 *         description: Successfully unlike blog
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/report:
 *   get:
 *     summary: Get a list of report status
 *     tags:
 *      - REPORT SECTION
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: The number of page to skip before starting to collect the result set
 *          example: 1
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - report_status_id: 1
 *                 title: Sample Report status 1
 *               - report_status_id: 2
 *                 title: Sample Report status 2
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blogs/report:
 *   get:
 *     summary: Get a list of blog report
 *     tags:
 *      - REPORT SECTION
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - blogId: 1
 *                 title: Sample Blog 1
 *               - blogId: 2
 *                 title: Sample Blog 2
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blogs/report:
 *   post:
 *     summary: Create a blog report
 *     tags:
 *      - REPORT SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reporter_id:
 *                 type: string
 *                 description: ID of the user sending report
 *                 example: "11893856-610c-40e2-bd33-e8410cfc3dc2"
 *               blog_id:
 *                 type: string
 *                 description: ID of the blog
 *                 example: "9d47a0e3-9f5c-4108-9985-ba52d467a6c2"
 *               report_status_id:
 *                 type: string
 *                 description: ID of the report status
 *                 example: "6fff783e-d216-48a1-95ca-8d7ae9e1dbc5"
 *     responses:
 *       '201':
 *         description: blog report create successfully
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/blogs/report/{reportId}:
 *   delete:
 *     summary: Delete a specific report by ID
 *     tags:
 *       - REPORT SECTION
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         description: ID of the report to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Report deleted successfully
 *       '404':
 *         description: Report not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/events/report:
 *   get:
 *     summary: Get a list of event report
 *     tags:
 *      - REPORT SECTION
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - eventId: 1
 *                 title: Sample Event 1
 *               - eventId: 2
 *                 title: Sample Event 2
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/events/report:
 *   post:
 *     summary: Create a event report
 *     tags:
 *      - REPORT SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reporter_id:
 *                 type: string
 *                 description: ID of the user sending report
 *                 example: "11893856-610c-40e2-bd33-e8410cfc3dc2"
 *               event_id:
 *                 type: string
 *                 description: ID of the event
 *                 example: "50b415b6-b874-429c-9f31-56db62ff0c13"
 *               report_status_id:
 *                 type: string
 *                 description: ID of the report status
 *                 example: "6fff783e-d216-48a1-95ca-8d7ae9e1dbc5"
 *     responses:
 *       '201':
 *         description: Event report create successfully
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/events/report/{reportId}:
 *   delete:
 *     summary: Delete a specific event report by ID
 *     tags:
 *       - REPORT SECTION
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         description: ID of the report to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Report deleted successfully
 *       '404':
 *         description: Report not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/report:
 *   get:
 *     summary: Get a list of user report
 *     tags:
 *      - REPORT SECTION
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - user_id: 1
 *                 user_name: Sample User 1
 *               - user_id: 2
 *                 user_name: Sample User 2
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/report:
 *   post:
 *     summary: Create a user report
 *     tags:
 *      - REPORT SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reporter_id:
 *                 type: string
 *                 description: ID of the user sending report
 *                 example: "33a43d47-52e2-43c0-acb7-b445a7989e8a"
 *               user_id:
 *                 type: string
 *                 description: ID of the user
 *                 example: "716ab41a-a01e-46ac-a907-f0c1419f212f"
 *               report_status_id:
 *                 type: string
 *                 description: ID of the report status
 *                 example: "01872afc-23b5-4890-85d2-b3f0a9d3ce0a"
 *     responses:
 *       '201':
 *         description: User report create successfully
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/users/report/{reportId}:
 *   delete:
 *     summary: Delete a specific user report by ID
 *     tags:
 *       - REPORT SECTION
 *     parameters:
 *       - in: path
 *         name: reportId
 *         required: true
 *         description: ID of the report to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Report deleted successfully
 *       '404':
 *         description: Report not found
 *       '500':
 *         description: Internal server error
 */
router.get('/api/blog', blogController.getBlogs);
router.get('/api/blog/:blogId', blogController.getBlog);
router.post('/api/blog', blogController.createBlog);
router.put('/api/blog/:blogId', blogController.updateBlog);
router.delete('/api/blog/:blogId', blogController.deleteBlog);
router.put(
  '/api/blog/image/:blogId',
  uploadCloud.single('image'),
  blogController.updateImg,
);
router.get('/api/blogs/popular', blogController.getPopularBlogs);
router.get('/api/blog/new/blogs', blogController.getNewBlogs);
router.post('/api/blog/search', blogController.searchByName);

router.get('/api/blog/comment/:blogId', blogController.getComments);
router.post('/api/blog/comment', blogController.createComment);
router.put('/api/blog/comment/:commentId', blogController.updateComment);
router.delete('/api/blog/comment/:commentId', blogController.deleteComment);

router.post('/api/blogs/like', blogController.likeBlog);
router.put('/api/blogs/like', blogController.unLikeBlog);

router.get('/api/report', reportController.getAllReportStatus);

router.get('/api/blogs/report', reportController.getAllBlogReport);
router.post('/api/blogs/report', reportController.createBlogReport);
router.delete('/api/blogs/report/:reportId', reportController.deleteBlogReport);

router.get('/api/events/report', reportController.getAllEventReport);
router.post('/api/events/report', reportController.createEventReport);
router.delete(
  '/api/events/report/:reportId',
  reportController.deleteEventReport,
);

router.get('/api/users/report', reportController.getAllUserReport);
router.post('/api/users/report', reportController.createUserReport);
router.delete('/api/users/report/:reportId', reportController.deleteUserReport);
/**
 * @swagger
 * /api/moderator/login:
 *   post:
 *     summary: Moderator login
 *     tags:
 *       - MODERATOR SECTION
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: loginPayload
 *         description: Moderator login payload
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               description: Moderator username
 *               example: moderator123
 *             password:
 *               type: string
 *               description: Moderator password
 *               example: password123
 *     responses:
 *       '200':
 *         description: Moderator successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token for the moderator session
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       '401':
 *         description: Unauthorized - Invalid credentials
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/moderator/blog/{blogId}:
 *   put:
 *     summary: Censor a blog post by ID
 *     tags:
 *       - MODERATOR SECTION
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post to censor
 *         schema:
 *           type: string
 *         example: 423e7485-3d45-42b4-a1dd-2b05641d8943
 *       - in: body
 *         name: censorBlogBody
 *         description: Request body to censor the blog post
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             censorReason:
 *               type: string
 *               description: Reason for censoring the blog post
 *               example: Inappropriate content
 *     responses:
 *       '200':
 *         description: Blog post successfully censored
 *       '404':
 *         description: Blog post not found
 *       '500':
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/moderator/event/{eventId}:
 *   put:
 *     summary: Censor an event as a moderator
 *     tags:
 *       - MODERATOR SECTION
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         description: ID of the event to censor
 *         schema:
 *           type: string
 *         example: 50b415b6-b874-429c-9f31-56db62ff0c18
 *     responses:
 *       '204':
 *         description: Event successfully censored
 *       '404':
 *         description: Event not found
 *       '500':
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /api/auth/matching-status:
 *   put:
 *     summary: Update user match status
 *     description: Update the match status of a user.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - MATCH SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the user whose match status is to be updated.
 *               status:
 *                 type: string
 *                 enum: [Pending, Approved, Rejected]
 *                 description: The new status to set for the user's match.
 *     responses:
 *       200:
 *         description: Successful update of user match status
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/auth/matched:
 *   get:
 *     summary: Get user matches with status
 *     description: Retrieve user matches with their corresponding status.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - MATCH SECTION
 *     responses:
 *       200:
 *         description: Successful response with user matches and their statuses
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/auth/matched:
 *   get:
 *     summary: Get user matches with status
 *     description: Retrieve user matches with their corresponding status.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - MATCH SECTION
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Status of the user matches
 *     responses:
 *       200:
 *         description: Successful response with user matches and their statuses
 *       401:
 *         description: Unauthorized, invalid or missing token
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * tags:
 *   - name: MATCH SECTION
 *     description: Operations related to matches
 *
 * /api/match/user-status/count:
 *   get:
 *     summary: Count users by status
 *     description: Retrieve the count of users based on their match status.
 *     tags:
 *       - MATCH SECTION
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data:
 *                 - user_match_status: "liked"
 *                   status_count: 10
 *                 - user_match_status: "matched"
 *                   status_count: 5
 *       500:
 *         description: Internal server error
 */
router.get('/api/match/user-status/count', matchController.countUserByStatus);
router.get(
  '/api/auth/matches-interest',
  matchController.getUserMatchByInterest,
);

router.get('/api/auth/matched', matchController.getUserMatchWithStatus);

router.get(
  '/api/auth/pending-for-matched',
  matchController.getUserMatchWithPendingStatus,
);

router.put('/api/auth/matching-status', matchController.updateUserMatchStatus);

router.post('/api/user/message', chatController.viewMessage);

router.post('/api/user/schedule', scheduleController.createSchedule);
/**
 * @swagger
 * tags:
 *   name: SCHEDULE SECTION
 *   description: API operations related to meeting schedule
 */
/**
 * @swagger
 * /api/user/schedule:
 *   post:
 *     summary: Create a new meeting schedule
 *     tags:
 *      - SCHEDULE SECTION
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sender_id:
 *                 type: string
 *                 description: ID of the user creating the meeting
 *                 example: "5e615fa6-9a98-4fb4-9c4a-1bacb4692e00"
 *               receiver_id:
 *                 type: string
 *                 description: ID of the user receive the schedule
 *                 example: "e517f126-4ad9-418d-9462-47829ef58aa3"
 *               content:
 *                 type: string
 *                 description: Content of the meeting
 *                 example: "Hangout for some coffee"
 *               location:
 *                 type: string
 *                 description: Location of meeting
 *                 example: "Highland Coffee"
 *               date:
 *                 type: string
 *                 description: Time of meeting
 *                 example: "3/20/2024"
 *     responses:
 *       '201':
 *         description: Schedule created successfully
 *       '400':
 *         description: Bad request, e.g., missing parameters
 *       '500':
 *         description: Internal server error
 */
// CHAT SECTION
/**
 * @swagger
 * /api/auth/chat-history:
 *   get:
 *     summary: Get chat history
 *     description: Retrieve chat history based on userId, with pagination using limit and offset.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve chat history for.
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         required: true
 *         description: Maximum number of messages to retrieve.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         required: true
 *         description: Offset for pagination.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully retrieved chat history.
 *       '400':
 *         description: Bad request. Invalid parameters provided.
 *       '500':
 *         description: An internal server error occurred.
 */
router.get('/api/auth/chat-history', chatController.getChatHistory);

router.put('/api/location/updateCurrentLocation', locationController.updateCurrentLocation,);
router.get('/api/location/getDistance', locationController.getDistance);
router.get('/api/location/getRecommendCafe',locationController.getRecommendCafe,);
/**
 * @swagger
 * /api/location/updateCurrentLocation:
 *   put:
 *     summary: Put current location
 *     description: Update current location based on latitude and longitude
 *     tags:
 *      - LOCATION SECTION
 *     parameters:
 *       - in: query
 *         name: lat
 *         required: true
 *         description: Latitude of current location
 *         example: 10.841743
 *         schema:
 *           type: string
 *       - in: query
 *         name: lng
 *         required: true
 *         description: Longtitude of current location
 *         example: 106.792377
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved location.
 *       '400':
 *         description: Bad request. Invalid parameters provided.
 *       '500':
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/location/getRecommendCafe:
 *   get:
 *     summary: Get Recomment Cafe store between 2 location
 *     description: Retrieve Recomment Cafe store between 2 location
 *     tags:
 *      - LOCATION SECTION
 *     parameters:
 *       - in: query
 *         name: originsLAT
 *         required: true
 *         description: Latitude of current location
 *         example: 10.855287291321535
 *         schema:
 *           type: string
 *       - in: query
 *         name: originsLNG
 *         required: true
 *         description: Longtitude of current location
 *         example: 106.6513152333054
 *         schema:
 *           type: string
 *       - in: query
 *         name: destinationsLAT
 *         required: string
 *         description: Latitude of destination location
 *         example: 10.838551192432636
 *         schema:
 *           type: string
 *       - in: query
 *         name: destinationsLNG
 *         required: true
 *         description: Longtitude of destination location
 *         example: 106.78081128616805
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved chat history.
 *       '400':
 *         description: Bad request. Invalid parameters provided.
 *       '500':
 *         description: An internal server error occurred.
 */

/**
 * @swagger
 * /api/location/distance:
 *   get:
 *     summary: Get distance between 2 location
 *     description: Retrieve distance between 2 location
 *     tags:
 *      - LOCATION SECTION
 *     parameters:
 *       - in: query
 *         name: originsLAT
 *         required: true
 *         description: Latitude of current location
 *         example: 20.981971
 *         schema:
 *           type: string
 *       - in: query
 *         name: originsLNG
 *         required: true
 *         description: Longtitude of current location
 *         example: 105.864323
 *         schema:
 *           type: string
 *       - in: query
 *         name: destinationsLAT
 *         required: true
 *         description: Latitude of destination location
 *         example: 21.031011
 *         schema:
 *           type: string
 *       - in: query
 *         name: destinationsLNG
 *         required: true
 *         description: Longtitude of destination location
 *         example: 105.783206
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved chat history.
 *       '400':
 *         description: Bad request. Invalid parameters provided.
 *       '500':
 *         description: An internal server error occurred.
 */
export default router;
