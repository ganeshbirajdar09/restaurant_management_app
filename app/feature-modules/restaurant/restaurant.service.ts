import { FilterQuery, UpdateQuery } from "mongoose";
import { IRestaurant } from "./restaurant.types";
import restaurantRepo from "./restaurant.repo";
import userService from "../user/user.service";
import { RESTAURANT_RESPONSE } from "./restaurant.responses";

const create = async (resto: IRestaurant) => {
    const { ownerId } = resto;
    const oldResto = await restaurantRepo.findOne({ ownerId: ownerId, name: resto.name })
    if (oldResto) throw RESTAURANT_RESPONSE.ALREADY_EXISTS;
    const newResto = await restaurantRepo.create(resto);
    await userService.findOneAndUpdate(ownerId, { name: newResto.name, _id: newResto._id });
    return newResto
}

const findAllRestosPublic = async () => {
    const restos = await restaurantRepo.findAllRestosPublic({ $and: [{ isDeleted: false }, { status: "accepted" }] }).select({ name: 1, location: 1, menu: 1, _id: 0 })
    if (restos.length < 1) throw RESTAURANT_RESPONSE.NOT_FOUND;
    return restos
}

const find = (filterParam: FilterQuery<IRestaurant> = {}) => restaurantRepo.find(filterParam)
const findOne = async (filterParam: FilterQuery<IRestaurant>) => await restaurantRepo.findOne(filterParam)

const changeRestoStatus = async (filterParam: FilterQuery<IRestaurant>) => {
    const { _id, status } = filterParam;
    const result = await restaurantRepo.update({ _id: _id }, { $set: { status: status } });
    if (result.modifiedCount < 1) throw RESTAURANT_RESPONSE.UPDATE_FAILURE;
    return RESTAURANT_RESPONSE.UPDATE_SUCCESS
}


const remove = async (filterParam: FilterQuery<IRestaurant>) => {
    const { _id } = filterParam;
    const result = await restaurantRepo.update({ _id: _id }, { isDeleted: true })
    if (result.modifiedCount < 1) throw RESTAURANT_RESPONSE.DELETE_FAILURE;
    return RESTAURANT_RESPONSE.DELETE_SUCCESS
}
const addBranch = async (data: FilterQuery<IRestaurant>) => {
    const { restId, branches } = data
    const oldResto = await findOne({ _id: restId });
    if (!oldResto) throw RESTAURANT_RESPONSE.NOT_FOUND;
    if (oldResto.status !== "accepted") throw RESTAURANT_RESPONSE.NOT_APPROVED;

    await update({ _id: restId }, { $push: { branches: { $each: branches } } })
    return oldResto;
}

const updateMenu = async (restId: string, menu: UpdateQuery<IRestaurant>) => {
    const result = await restaurantRepo.update({ _id: restId }, { $push: { menu: { $each: menu } } });
    if (result.modifiedCount < 1) throw RESTAURANT_RESPONSE.UPDATE_FAILURE;
    const resto = await restaurantRepo.findOne({ _id: restId });
    return resto
}
const update = async (filterParam: FilterQuery<IRestaurant>, data: UpdateQuery<IRestaurant>) => {
    const resto = await restaurantRepo.findOne({ _id: filterParam });

    console.log(resto)
    if (!resto) throw RESTAURANT_RESPONSE.UPDATE_FAILURE;

    const result = await restaurantRepo.update({ _id: filterParam }, data);
    if (result.modifiedCount < 1) throw RESTAURANT_RESPONSE.UPDATE_FAILURE;
    return resto
}

const deleteResto = async (data: FilterQuery<IRestaurant>) => {
    const { id } = data;
    const resto = await findOne({ _id: id });
    if (!resto) throw RESTAURANT_RESPONSE.NOT_FOUND;
    await restaurantRepo.update({ _id: id }, { isDeleted: true })
    return RESTAURANT_RESPONSE.DELETE_SUCCESS
}

const deleteRestosWithOwner = (filterParam: FilterQuery<IRestaurant>, data: UpdateQuery<IRestaurant>) => restaurantRepo.update(filterParam, data)

export default {
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
}