import { body } from "express-validator";
import { validate } from "../../utilities/validate";

export const CREATE_USER_VALIDATION = [
    body("name").isString().notEmpty().withMessage("name is required"),
    body("email").isString().notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format"),
    body("password").isString().notEmpty().withMessage("password is required").isLength({ min: 5 }).withMessage("minimum 5 character required"), validate
]

export const UPDATE_USER_VALIDATION = [
    body("_id").isString().notEmpty().withMessage("_id is required"),
    body("name").optional().isString().notEmpty().withMessage("name is required"),
    body("email").optional().isString().notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format"),
    body("password").optional().isString().notEmpty().withMessage("password is required").isLength({ min: 6 }).withMessage("minimum 6 character required"),
]