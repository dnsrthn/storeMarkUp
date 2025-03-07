import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js"

export const updateInvoiceValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id").isMongoId().withMessage("It is not a valid ID"),
    body("nameProduct").optional().notEmpty().withMessage("Name product is required"),
    body("quantity").optional().isNumeric().withMessage("Quantity must be a number"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    validarCampos,
    handleErrors
]

export const getInvoiceByUserValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]