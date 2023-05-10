import { Route, Routes } from "./routes.types";
import Routers from '../feature-modules/index';
import { ExcludedPath, ExcludedPaths } from "../utilities/authorize";
import { Router } from "express";

export const routes: Routes = [
    new Route("/users", Routers.UserRouter),
    new Route("/auth", Routers.AuthRouter),
    new Route("/restaurant",Routers.RestaurantRouter)
];


export const excludedPaths: ExcludedPaths = [
    new ExcludedPath("/auth/login", "POST"),
    new ExcludedPath("/auth/register", "POST"),
    new ExcludedPath("/users", "GET", ""),
    new ExcludedPath("/restaurant/allrestos", "GET", ""),
];