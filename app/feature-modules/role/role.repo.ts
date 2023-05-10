import { RoleModel } from "./role.schema";
import { IRole } from "./role.types";

const create =  (role: IRole) =>  RoleModel.create(role);
const find = async (filterParam: Partial<IRole>) => await RoleModel.find(filterParam)


export default {
    create,find
}