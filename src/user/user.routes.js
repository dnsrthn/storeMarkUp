import { Router } from "express"
import { deleteUser, updateRole, updateUser, updateUserProfile, updateProfilePicture, updatePassword } from "./user.controller.js"
import { deleteUserValidator, updateRoleValidator, updateUserValidator, updateProfileValidator, deleteProfileValidator, updateProfilePictureValidator, updatePasswordValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /updateRole/{uid}:
 *   patch:
 *     summary: Update user role
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: New role for the user
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.patch('/updateRole/:uid', updateRoleValidator, updateRole)

/**
 * @swagger
 * /updateUser/{uid}:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.put('/updateUser/:uid', updateUserValidator, updateUser)

/**
 * @swagger
 * /deleteUser/{uid}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/deleteUser/:uid', deleteUserValidator, deleteUser)

/**
 * @swagger
 * /updateProfile/{uid}:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio:
 *                 type: string
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.put('/updateProfile/:uid', updateProfileValidator, updateUserProfile)

/**
 * @swagger
 * /deleteProfile/{uid}:
 *   delete:
 *     summary: Delete user profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/deleteProfile/:uid', deleteProfileValidator, deleteUser)

/**
 * @swagger
 * /updateProfilePicture/{uid}:
 *   patch:
 *     summary: Update user profile picture
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile picture updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.patch('/updateProfilePicture/:uid', uploadProfilePicture.single('profilePicture'), updateProfilePictureValidator, updateProfilePicture)

/**
 * @swagger
 * /updatePassword/{uid}:
 *   patch:
 *     summary: Update user password
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.patch('/updatePassword/:uid', updatePasswordValidator, updatePassword)


export default router