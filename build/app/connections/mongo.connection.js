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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = void 0;
const mongoose_1 = require("mongoose");
const connectToMongo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { MONGO_CONNECTION } = process.env;
        yield (0, mongoose_1.connect)(MONGO_CONNECTION || '');
        return true;
    }
    catch (e) {
        console.log('COULD NOT CONNECT TO MONGO DB');
        throw {
            message: 'COULD NOT CONNECT TO MONGO DB',
            error: e
        };
    }
});
exports.connectToMongo = connectToMongo;
//# sourceMappingURL=mongo.connection.js.map