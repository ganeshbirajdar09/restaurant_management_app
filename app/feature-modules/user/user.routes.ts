import { Router, Response, Request, NextFunction } from "express";
import userService from "./user.service";
import { ResponseHandler } from "../../utilities/response-handler";
import { ROLES } from "../../utilities/constants";
import { permit } from "../../utilities/authorize";

const router = Router();


router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.find({ role: "2" });
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await userService.findOne({ _id: id }).select({ password: 0 });
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", permit([ROLES.ADMIN, ROLES.OWNER]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const result = await userService.deleteUser(id);
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})






export default router;