import { body } from "express-validator"
import { handleErrors } from "./handle-errors.js"
import { validarCampos } from "./validate-fields.js"
import { validateJWT } from "./validate-jwt.js"
import { productNameExists } from "../helpers/db-validators.js"


export const addToCartValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];

export const getCartValidator = [
    validateJWT,
    validarCampos,
    handleErrors
];

export const deleteFromCartvValidator= [
    validateJWT,
    validarCampos,
    handleErrors
];