"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedPaths = exports.routes = void 0;
const routes_types_1 = require("./routes.types");
const index_1 = __importDefault(require("../feature-modules/index"));
const authorize_1 = require("../utilities/authorize");
exports.routes = [
    new routes_types_1.Route("/users", index_1.default.UserRouter),
    new routes_types_1.Route("/auth", index_1.default.AuthRouter),
    new routes_types_1.Route("/restaurant", index_1.default.RestaurantRouter)
];
exports.excludedPaths = [
    // new ExcludedPath("/auth/login", "POST"),
    // new ExcludedPath("/auth/register", "POST"),
    // new ExcludedPath("/users", "GET"),
    // new ExcludedPath("/restaurant/allrestos", "GET"),
    new authorize_1.ExcludedPath(["/users/:id"], "GET"),
];
//# sourceMappingURL=routes.data.js.map