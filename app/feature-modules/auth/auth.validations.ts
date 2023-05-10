import { body } from "express-validator";
import { validate } from "../../utilities/validate";

​
export const AUTH_VALIDATOR = [
    body("email").isEmail().withMessage("email is required"),
    body("password").isLength({min: 4}).withMessage("password is required"),
    validate
]