import { body, param } from "express-validator"
import { emailExists, usernameExists, userExists, adminRole, adminRoleDelete, userUpdateProfile } from "../helpers/db-validators.js"
import { validarCampos } from "./validate-fields.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const registerAdminValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    /*
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),*/
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const registerValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    /*body("password").isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),*/
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("username").optional().isString().withMessage("Username must be a string"),
    body("password").isLength({ min: 4 }).withMessage("Password must be at least 8 characters long"),
    validarCampos,
    handleErrors
]

export const updateRoleValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "Invalid ID").isMongoId(),
    param("uid").custom(userExists),
    param("uid").custom(adminRole),
    validarCampos,
    handleErrors
]

export const deleteUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    param("uid").custom(adminRoleDelete),
    validarCampos,
    handleErrors
]

export const updateUserValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid", "Invalid ID").isMongoId(),
    param("uid").custom(userExists),
    param("uid").custom(adminRole),
    validarCampos,
    handleErrors
]

export const updateProfileValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    param("uid", "Invalid ID").isMongoId(),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const deleteProfileValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    body("confirmDeletion").equals("DELETE_PROFILE").withMessage("Incorrect deletion confirmation"),
    validarCampos,
    handleErrors
]

export const updateProfilePictureValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    param("uid").custom(userUpdateProfile),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE", "CLIENT_ROLE"),
    param("uid").isMongoId().withMessage("Invalid MongoDB ID"),
    param("uid").custom(userExists),
    param("uid").custom(userUpdateProfile),
    body("newPassword").isLength({ min: 8 }).withMessage("Password must be at least 8 characters long"),
    validarCampos,
    handleErrors
]