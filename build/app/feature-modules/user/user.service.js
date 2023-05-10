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
const user_repo_1 = __importDefault(require("./user.repo"));
const user_responses_1 = require("./user.responses");
const restaurant_service_1 = __importDefault(require("../restaurant/restaurant.service"));
const create = (user) => user_repo_1.default.create(user);
const find = (filterParam = {}) => user_repo_1.default.find(filterParam).select("name restaurants");
const findOne = (filterParam) => user_repo_1.default.findOne(filterParam);
const findOneAndUpdate = (ownerId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = yield find({ _id: ownerId });
    if (!owner)
        throw user_responses_1.USER_RESPONSE.NOT_FOUND;
    const result = user_repo_1.default.findOneAndUpdate({ _id: ownerId }, { $push: { restaurants: data } });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = yield findOne({ _id: id });
    if (!owner)
        throw user_responses_1.USER_RESPONSE.NOT_FOUND;
    yield restaurant_service_1.default.deleteRestosWithOwner({ ownerId: owner._id }, { isDeleted: true });
    yield user_repo_1.default.update({ _id: id }, { isDeleted: true });
    return user_responses_1.USER_RESPONSE.DELETE_SUCCESS;
});
exports.default = {
    create, find, findOne, findOneAndUpdate, deleteUser
};
//# sourceMappingURL=user.service.js.map