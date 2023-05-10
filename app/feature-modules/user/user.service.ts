import { FilterQuery, UpdateQuery } from "mongoose";
import userRepo from "./user.repo";
import { IUser } from "./user.types";
import { USER_RESPONSE } from "./user.responses";
import { IRestaurant } from "../restaurant/restaurant.types";
import restaurantService from "../restaurant/restaurant.service";

const create = (user: IUser) => userRepo.create(user);

const find = (filterParam: FilterQuery<IUser> = {}) => userRepo.find(filterParam).select("name restaurants")

const findOne = (filterParam: FilterQuery<IUser>) => userRepo.findOne(filterParam)

const findOneAndUpdate = async (ownerId: string, data: UpdateQuery<IRestaurant>) => {
    const owner = await find({ _id: ownerId })
    if (!owner) throw USER_RESPONSE.NOT_FOUND;

    const result = userRepo.findOneAndUpdate({ _id: ownerId }, { $push: { restaurants: data } });
    return result;
}
const deleteUser = async (id: string) => {
    const owner = await findOne({ _id: id });
    if (!owner) throw USER_RESPONSE.NOT_FOUND;
    await restaurantService.deleteRestosWithOwner({ ownerId: owner._id }, { isDeleted: true })
    await userRepo.update({ _id: id }, { isDeleted: true });
    return USER_RESPONSE.DELETE_SUCCESS
}

export default {
    create, find, findOne, findOneAndUpdate, deleteUser
}
