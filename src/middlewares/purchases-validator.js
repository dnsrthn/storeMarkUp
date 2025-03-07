import { body, param } from "express-validator"
import { validarCampos } from "./validate-fields.js"
import { handleErrors } from "./handle-errors.js"
import { validateJWT } from "./validate-jwt.js"

export const purchaseValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]

export const historyValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]