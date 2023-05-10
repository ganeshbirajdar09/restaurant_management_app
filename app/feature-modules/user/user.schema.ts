import mongoose, { model, ObjectId } from "mongoose";
import { BaseSchema } from "../../utilities/base-schema";
import { IUser } from "./user.types";

const UserSchema = new BaseSchema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false
    },
    restaurants: [{
        id: {
            type: mongoose.Schema.Types.ObjectId
        },
        name: {
            type: String
        },
        // ref: "restaurant"
    }],
})

type UserDocument = Document & IUser;


export const UserModel = model<UserDocument>("user", UserSchema)