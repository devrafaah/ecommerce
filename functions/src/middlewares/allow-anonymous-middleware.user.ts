import { NextFunction, Response, Request } from "express";
import { ForbiddenError } from "../errors/forbidden.error.js";

export const allowAnonymousUser = (req: Request, res: Response, next: NextFunction) => {
    if(req.user) {
        return next()
    }

    if(req.method == "GET") {
        if(
            req.url === "/companies/getAll" ||
            req.url === "/products/getAll" ||
            req.url === "/categories/getAll" ||
            req.url === "/payment-method/getAll" ||
            req.url.startsWith("/order/")
        ){
            return next();
        }
    } else if(req.method == "POST") {
        if(req.url === "/orders/getAll"){
            return next();
        }
    }

    return next(new ForbiddenError("Você não possui permissão para acessar este recurso"));
}