"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESTAURANT_UPDATE_VALIDATIONS = exports.RESTAURANT_ADD_MENU_VALIDATIONS = exports.RESTAURANT_CREATE_VALIDATION = exports.RESTAURANT_STATUS_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const validate_1 = require("../../utilities/validate");
exports.RESTAURANT_STATUS_VALIDATION = [
    (0, express_validator_1.body)("status").isString().notEmpty().withMessage("status is required"), validate_1.validate
];
exports.RESTAURANT_CREATE_VALIDATION = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("name is required").isLength({ min: 3 }), (0, express_validator_1.body)("location").isString().notEmpty().withMessage("location is required"), validate_1.validate
];
exports.RESTAURANT_ADD_MENU_VALIDATIONS = [
    (0, express_validator_1.body)("restId").notEmpty().withMessage("restId is required"),
    (0, express_validator_1.body)("menu").isArray().notEmpty().withMessage("menu is required")
];
exports.RESTAURANT_UPDATE_VALIDATIONS = [
    (0, express_validator_1.body)("restId").notEmpty().withMessage("restId is required"),
];
//# sourceMappingURL=restaurant.validations.js.map