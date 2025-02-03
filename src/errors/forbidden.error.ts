import { ErrorBase } from "./base.error";

export class ForbiddenError extends ErrorBase {


    constructor(message = "Não autorzado") {
        super(403, message)
    }
}