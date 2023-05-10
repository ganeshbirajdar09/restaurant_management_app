"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateKeyGenerator = exports.publicKeyGenerator = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const publicKeyGenerator = () => fs_1.default.readFileSync(path_1.default.resolve(__dirname, "keys", "public.pem"), { encoding: "utf8" });
exports.publicKeyGenerator = publicKeyGenerator;
const privateKeyGenerator = () => fs_1.default.readFileSync(path_1.default.resolve(__dirname, "keys", "private.pem"), { encoding: "utf8" });
exports.privateKeyGenerator = privateKeyGenerator;
//# sourceMappingURL=keys.generate.js.map