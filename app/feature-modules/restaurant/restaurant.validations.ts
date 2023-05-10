import { body } from "express-validator";
import { validate } from "../../utilities/validate";

export const RESTAURANT_STATUS_VALIDATION = [
    body("status").isString().notEmpty().withMessage("status is required"),validate
]
export const RESTAURANT_CREATE_VALIDATION = [
    body("name").isString().notEmpty().withMessage("name is required").isLength({min: 3}),body("location").isString().notEmpty().withMessage("location is required"),validate
]
export const RESTAURANT_ADD_MENU_VALIDATIONS = [
    body("restId").notEmpty().withMessage("restId is required"),
    body("menu").isArray().notEmpty().withMessage("menu is required")
]
export const RESTAURANT_UPDATE_VALIDATIONS = [
    body("restId").notEmpty().withMessage("restId is required"),
]
