"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const base_error_1 = require("./base.error");
class ForbiddenError extends base_error_1.ErrorBase {
    constructor(message = "Não autorzado") {
        super(403, message);
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=forbidden.error.js.map