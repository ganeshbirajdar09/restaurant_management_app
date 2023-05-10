"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_service_1 = __importDefault(require("./restaurant.service"));
const response_handler_1 = require("../../utilities/response-handler");
const constants_1 = require("../../utilities/constants");
const authorize_1 = require("../../utilities/authorize");
const restaurant_validations_1 = require("./restaurant.validations");
const router = (0, express_1.Router)();
//PUBLIC 
router.get("/allrestos", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurant_service_1.default.findAllRestosPublic();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
//PROTECTED
router.get("/all", (0, authorize_1.permit)([constants_1.ROLES.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurant_service_1.default.find();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.post("/register", restaurant_validations_1.RESTAURANT_CREATE_VALIDATION, (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resto = req.body;
        resto.ownerId = res.locals.user.id;
        const result = yield restaurant_service_1.default.create(resto);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/status", (0, authorize_1.permit)([constants_1.ROLES.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restoInfo = req.body;
        const result = yield restaurant_service_1.default.changeRestoStatus(restoInfo);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/addbranch", (0, authorize_1.permit)([constants_1.ROLES.OWNER, constants_1.ROLES.ADMIN]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resto = req.body;
        resto.ownerId = res.locals.user.id;
        const result = yield restaurant_service_1.default.addBranch(resto);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/:id", (0, authorize_1.permit)([constants_1.ROLES.ADMIN, constants_1.ROLES.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.params;
        const result = yield restaurant_service_1.default.deleteResto(data);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/updateMenu", restaurant_validations_1.RESTAURANT_ADD_MENU_VALIDATIONS, (0, authorize_1.permit)([constants_1.ROLES.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restId, menu } = req.body;
        const result = yield restaurant_service_1.default.updateMenu(restId, menu);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/update", restaurant_validations_1.RESTAURANT_UPDATE_VALIDATIONS, (0, authorize_1.permit)([constants_1.ROLES.OWNER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.body, { restId } = _a, field = __rest(_a, ["restId"]);
        const result = yield restaurant_service_1.default.update(restId, field);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
//# sourceMappingURL=restaurant.routes.js.map