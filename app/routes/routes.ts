import { Application, json, NextFunction, Request, Response } from "express";
import { authorize } from "../utilities/authorize";
import { ResponseHandler } from "../utilities/response-handler";
import { excludedPaths, routes } from "./routes.data";
import cors from 'cors'

export const registerRoutes = (app: Application) => {

    app.use(json());
    const corsOptions = {
        origin: '*',
    }
    app.use(cors(corsOptions))
    app.use(authorize(excludedPaths));

    for (let route of routes) {
        app.use(route.path, route.router);
    }

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res
            .status(err.statusCode || 500)
            .send(new ResponseHandler(null, err));
    })

}