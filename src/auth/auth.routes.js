import { Router } from "express"
import { registerAdmin, register, login} from "./auth.controller.js"
import { registerAdminValidator, loginValidator, registerValidator } from "../middlewares/user-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Registra un nuevo administrador
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Administrador registrado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post(
    "/admin/register",
    uploadProfilePicture.single("profilePicture"), 
    registerAdminValidator, 
    registerAdmin
)

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Auth]
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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
router.post(
    "/register",
    uploadProfilePicture.single("profilePicture"), 
    registerValidator, 
    register
)

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión un usuario
 *     tags: [Auth]
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
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Error en la validación de los datos
 */
router.post(
    "/login",
    loginValidator,
    login
)

export default router
