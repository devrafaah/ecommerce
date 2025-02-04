import { ErrorBase } from "../base.error.js";
export class UnauthorizedError extends ErrorBase {
    constructor(message = "Você não está autorizado") {
        super(401, message);
    }
}
//# sourceMappingURL=UnAuthorized.error.js.map