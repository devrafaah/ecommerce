import { ErrorBase } from "../base.error";


export class UnauthorizedError extends ErrorBase {



    constructor(message = "Você não está autorizado") {
        super(401, message)
    }
}