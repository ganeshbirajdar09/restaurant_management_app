import { compare, genSalt, hash } from "bcryptjs";
import { IUser } from "../user/user.types";
import userService from "../user/user.service";
import { AUTH_RESPONSES } from "./auth.responses";
import { ROLES } from "../../utilities/constants";
import { ICredentials } from "./auth.types";
import { sign } from "jsonwebtoken";
import { privateKeyGenerator } from "../../utilities/keys.generate";


const encryptPassword = async (user: IUser) => {
    const salt = await genSalt(10);
    const encryptedPassword = await hash(user.password, salt);
    user.password = encryptedPassword;
    return user
}

const register = async (user: IUser) => {
    const oldUser = await userService.findOne({ email: user.email });
    if (oldUser) throw AUTH_RESPONSES.ALREADY_EXISTS;
    await encryptPassword(user)
    if (!user.role) user.role = ROLES.OWNER;
    return await userService.create(user);
}

const login = async (credential: ICredentials) => {
    const user = await userService.findOne({ email: credential.email });
    if (!user) throw AUTH_RESPONSES.INVALID_CREDENTIALS;
    const isPasswordValid = await compare(credential.password, user.password);
    if (!isPasswordValid) throw AUTH_RESPONSES.INVALID_CREDENTIALS;


    const privateKey = privateKeyGenerator();
    // const {JWT_SECRET} = process.env;
    const token = sign({ id: user._id, role: user.role }, privateKey || "", { algorithm: "RS256" })

    const { _id, name, email, role } = user;
    return {
        token,
        user: { _id, name, email, role }
    }

}


export default {
    register, login
}