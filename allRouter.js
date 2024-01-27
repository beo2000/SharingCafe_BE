import express from 'express';

import uploadCloud from './APP/middleware/uploadCloudImg.js';
import * as admController from './APP/Controller/adminController.js';

const router = express.Router();
// ADMIN SWAGGER
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-related routes
 * /api/admin/login:
 *   post:
 *     summary: Admin login
 *     description: Login as an admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/api/admin/login', admController.loginAdmin);

export default router;
