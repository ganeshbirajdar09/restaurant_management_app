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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const restaurant_repo_1 = __importDefault(require("./restaurant.repo"));
const user_service_1 = __importDefault(require("../user/user.service"));
const restaurant_responses_1 = require("./restaurant.responses");
const create = (resto) => __awaiter(void 0, void 0, void 0, function* () {
    const { ownerId } = resto;
    const oldResto = yield restaurant_repo_1.default.findOne({ ownerId: ownerId, name: resto.name });
    if (oldResto)
        throw restaurant_responses_1.RESTAURANT_RESPONSE.ALREADY_EXISTS;
    const newResto = yield restaurant_repo_1.default.create(resto);
    yield user_service_1.default.findOneAndUpdate(ownerId, { name: newResto.name, _id: newResto._id });
    return newResto;
});
const findAllRestosPublic = () => __awaiter(void 0, void 0, void 0, function* () {
    const restos = yield restaurant_repo_1.default.findAllRestosPublic({ $and: [{ isDeleted: false }, { status: "accepted" }] }).select({ name: 1, location: 1, menu: 1, _id: 0 });
    if (restos.length < 1)
        throw restaurant_responses_1.RESTAURANT_RESPONSE.NOT_FOUND;
    return restos;
});
const find = (filterParam = {}) => restaurant_repo_1.default.find(filterParam);
const findOne = (filterParam) => __awaiter(void 0, void 0, void 0, function* () { return yield restaurant_repo_1.default.findOne(filterParam); });
const changeRestoStatus = (filterParam) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, status } = filterParam;
    const result = yield restaurant_repo_1.default.update({ _id: _id }, { $set: { status: status } });
    if (result.modifiedCount < 1)
        throw restaurant_responses_1.RESTAURANT_RESPONSE.UPDATE_FAILURE;
    return restaurant_responses_1.RESTAURANT_RESPONSE.UPDATE_SUCCESS;
});
const remove = (filterParam) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = filterParam;
    const result = yield restaurant_repo_1.default.update({ _id: _id }, { isDeleted: true });
    if (result.modifiedCount < 1)
        throw restaurant_responses_1.RESTAURANT_RESPONSE.DELETE_FAILURE;
    return restaurant_responses_1.RESTAURANT_RESPONSE.DELETE_SUCCESS;
});
const addBranch = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { restId, branches } = data;
    const oldResto = yield findOne({ _id: restId });
    if (!oldResto)
        throw restaurant_responses_1.RESTAURANT_RESPONSE.NOT_FOUND;
    if (oldResto.status !== "accepted")
        throw restaurant_responses_1.RESTAURANT_RESPONSE.NOT_APPROVED;
    yield update({ _id: restId }, { $push: { branches: { $each: branches } } });
    return oldResto;
});
const updateMenu = (restId, menu) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield restaurant_repo_1.default.update({ _id: restId }, { $push: { menu: { $each: menu } } });
    if (result.modifiedCount < 1)
        throw restaurant_responses_1.RESTAURANT_RESPONSE.UPDATE_FAILURE;
    const resto = yield restaurant_repo_1.default.findOne({ _id: restId });
    return resto;
});
const update = (filterParam, data) => __awaiter(void 0, void 0, void 0, function* () {
    const resto = yield restaurant_repo_1.default.findOne({ _id: filterParam });
    console.log(resto);
    if (!resto)
        throw restaurant_responses_1.RESTAURANT_RESPONSE.UPDATE_FAILURE;
    const result = yield restaurant_repo_1.default.update({ _id: filterParam }, data);
    if (result.modifiedCount < 1)
        throw restaurant_responses_1.RESTAURANT_RESPONSE.UPDATE_FAILURE;
    return resto;
});
const deleteResto = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = data;
    const resto = yield findOne({ _id: id });
    if (!resto)
        throw restaurant_responses_1.RESTAURANT_RESPONSE.NOT_FOUND;
    yield restaurant_repo_1.default.update({ _id: id }, { isDeleted: true });
    return restaurant_responses_1.RESTAURANT_RESPONSE.DELETE_SUCCESS;
});
const deleteRestosWithOwner = (filterParam, data) => restaurant_repo_1.default.update(filterParam, data);
exports.default = {
    create,
    findOne,
    find,
    changeRestoStatus,
    remove,
    updateMenu,
    update,
    findAllRestosPublic,
    deleteResto,
    deleteRestosWithOwner,
    addBranch
};
//# sourceMappingURL=restaurant.service.js.map