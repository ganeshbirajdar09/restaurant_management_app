import { Request, Router, Response, NextFunction } from "express";
import restaurantService from "./restaurant.service";
import { ResponseHandler } from "../../utilities/response-handler";
import { IRestaurant } from "./restaurant.types";
import { ROLES } from "../../utilities/constants";
import { permit } from "../../utilities/authorize";
import { RESTAURANT_ADD_MENU_VALIDATIONS, RESTAURANT_CREATE_VALIDATION, RESTAURANT_STATUS_VALIDATION, RESTAURANT_UPDATE_VALIDATIONS } from "./restaurant.validations";

const router = Router();

//PUBLIC 
router.get("/allrestos", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await restaurantService.findAllRestosPublic()
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})

//PROTECTED
router.get("/all", permit([ROLES.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await restaurantService.find();
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})
router.post("/register", RESTAURANT_CREATE_VALIDATION,permit([ROLES.ADMIN, ROLES.OWNER]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const resto: IRestaurant = req.body;
        resto.ownerId = res.locals.user.id;
        const result = await restaurantService.create(resto);
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})
router.patch("/status", permit([ROLES.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restoInfo = req.body;
        const result = await restaurantService.changeRestoStatus(restoInfo);
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }

})
router.patch("/addbranch", permit([ROLES.OWNER, ROLES.ADMIN]), async (req, res, next) => {
    try {
        const resto = req.body;
        resto.ownerId = res.locals.user.id;
        const result = await restaurantService.addBranch(resto);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.delete("/:id", permit([ROLES.ADMIN, ROLES.OWNER]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.params;
        const result = await restaurantService.deleteResto(data);
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})

router.patch("/updateMenu",RESTAURANT_ADD_MENU_VALIDATIONS ,permit([ROLES.OWNER]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { restId, menu } = req.body;
        const result = await restaurantService.updateMenu(restId, menu)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})
router.patch("/update", RESTAURANT_UPDATE_VALIDATIONS,permit([ROLES.OWNER]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { restId, ...field } = req.body;
        const result = await restaurantService.update(restId, field)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})


export default router;