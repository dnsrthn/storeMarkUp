import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"
import { deleteFileOnError } from "./delete-file-on-error.js"
import { productNameExists } from "../helpers/db-validators.js"

export const existingProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("productName").notEmpty().withMessage("Name product is required"),
    body("descriptionProduct").notEmpty().withMessage("Description is required"),
    body("price").isDecimal({min: 0}).withMessage("The price must not be less than 0"),
    body("productName").custom(productNameExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const getByNameValidator = [
    body("productName").custom(productNameExists),
    validarCampos,
    handleErrors
]

export const getSoldOutProductsValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    validarCampos,
    handleErrors
]    

export const updateProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("It is not a valid ID"),
    body("productName").optional().notEmpty().withMessage("Name product is required"),
    body("descriptionProduct").optional().notEmpty().withMessage("Description is required"),
    body("price").optional().isDecimal({min: 0}).withMessage("The price must not be less than 0"),
    body("productName").optional().custom(productNameExists),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const deleteProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("uid").isMongoId().withMessage("It is not a valid ID"),
    validarCampos,
    handleErrors
]