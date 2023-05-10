"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_USER_VALIDATION = exports.CREATE_USER_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utilities/validate");
exports.CREATE_USER_VALIDATION = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email").isString().notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format"),
    (0, express_validator_1.body)("password").isString().notEmpty().withMessage("password is required").isLength({ min: 5 }).withMessage("minimum 5 character required"), validate_1.validate
];
exports.UPDATE_USER_VALIDATION = [
    (0, express_validator_1.body)("_id").isString().notEmpty().withMessage("_id is required"),
    (0, express_validator_1.body)("name").optional().isString().notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email").optional().isString().notEmpty().withMessage("email is required").isEmail().withMessage("invalid email format"),
    (0, express_validator_1.body)("password").optional().isString().notEmpty().withMessage("password is required").isLength({ min: 6 }).withMessage("minimum 6 character required"),
];
//# sourceMappingURL=user.validations.js.map