import mongoose, { Mongoose, model } from "mongoose";
import { BaseSchema } from "../../utilities/base-schema";
import { IRestaurant } from "./restaurant.types";

const RestaurantSchema = new BaseSchema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "rejected"],
    },
    menu: {
        type: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            }
        }],
        default: []
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    location: {
        type: String,
        required: true
    },
    branches:{
        type: [String],
        required: false
    }
})
type RestaurantDocument = Document & IRestaurant;


export const RestaurantModel = model<RestaurantDocument>("restaurant", RestaurantSchema)