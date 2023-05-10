"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_schema_1 = require("./restaurant.schema");
const create = (resto) => restaurant_schema_1.RestaurantModel.create(resto);
const findAllRestosPublic = (filterParam = {}) => restaurant_schema_1.RestaurantModel.find();
const find = (filterParam) => restaurant_schema_1.RestaurantModel.find(filterParam);
const findOne = (filterParam) => restaurant_schema_1.RestaurantModel.findOne(filterParam);
const update = (filterParam, data) => restaurant_schema_1.RestaurantModel.updateMany(filterParam, data);
exports.default = {
    create, find, update, findOne, findAllRestosPublic
};
//# sourceMappingURL=restaurant.repo.js.map