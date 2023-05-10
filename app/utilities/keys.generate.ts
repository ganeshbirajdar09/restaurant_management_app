import fs from "fs";
import path from 'path'

export const publicKeyGenerator = () => fs.readFileSync(path.resolve(__dirname, "keys","public.pem"), { encoding: "utf8" });
export const privateKeyGenerator = () => fs.readFileSync(path.resolve(__dirname, "keys","private.pem"), { encoding: "utf8" });