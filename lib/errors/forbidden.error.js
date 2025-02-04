import { ErrorBase } from "./base.error.js";
export class ForbiddenError extends ErrorBase {
    constructor(message = "Não autorzado") {
        super(403, message);
    }
}
//# sourceMappingURL=forbidden.error.js.map