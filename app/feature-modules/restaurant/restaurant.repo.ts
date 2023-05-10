import { FilterQuery, UpdateQuery } from "mongoose";
import { RestaurantModel } from "./restaurant.schema";
import { IRestaurant } from "./restaurant.types";

const create = (resto: IRestaurant) => RestaurantModel.create(resto)

const findAllRestosPublic = (filterParam: FilterQuery<IRestaurant> = {}) => RestaurantModel.find()

const find = (filterParam: FilterQuery<IRestaurant>) => RestaurantModel.find(filterParam)

const findOne = (filterParam: FilterQuery<IRestaurant>) => RestaurantModel.findOne(filterParam)

const update = (filterParam: FilterQuery<IRestaurant>, data: UpdateQuery<IRestaurant>) => RestaurantModel.updateMany(filterParam, data)

export default {
    create, find, update, findOne, findAllRestosPublic
}