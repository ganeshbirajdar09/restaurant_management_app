"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const base_schema_1 = require("../../utilities/base-schema");
const RestaurantSchema = new base_schema_1.BaseSchema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    location: {
        type: String,
        required: true
    },
    branches: {
        type: [String],
        required: false
    }
});
exports.RestaurantModel = (0, mongoose_1.model)("restaurant", RestaurantSchema);
//# sourceMappingURL=restaurant.schema.js.map