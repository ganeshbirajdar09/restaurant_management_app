import { FilterQuery, UpdateQuery } from "mongoose";
import { IUser } from "./user.types";
import { UserModel } from "./user.schema";
import { IRestaurant } from "../restaurant/restaurant.types";

const create = (user: IUser) => UserModel.create(user);

const find = (filterParam: FilterQuery<IUser>) => UserModel.find(filterParam)

const findOne = (filterParam: FilterQuery<IUser>) => UserModel.findOne(filterParam)

const findOneAndUpdate = (filterParam: FilterQuery<IUser>, data: UpdateQuery<IRestaurant>) => UserModel.findOneAndUpdate(filterParam, data)

const update = (filterParam: FilterQuery<IUser>, data: UpdateQuery<IUser>) => UserModel.updateMany(filterParam, data);

export default {
    create, find, findOne, findOneAndUpdate, update
}