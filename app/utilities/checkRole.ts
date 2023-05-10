import { NextFunction, Request, Response } from "express";
export const checkRole = (id: string) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (res.locals.user.role != id) throw { statusCode: 403, message: "Access Denied" };
        next()
    } catch (error) {
        next(error)
    }
}