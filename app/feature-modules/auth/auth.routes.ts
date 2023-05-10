import { Router, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../utilities/response-handler";
import authService from "./auth.service";
import { AUTH_VALIDATOR } from "./auth.validations";

const router = Router();
router.post("/register", AUTH_VALIDATOR, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const result = await authService.register(user);
        res.send(new ResponseHandler(result));
    } catch (error) {
        next(error)
    }
})
router.post("/login", AUTH_VALIDATOR, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = req.body;
        const result = await authService.login(credentials);
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})


export default router