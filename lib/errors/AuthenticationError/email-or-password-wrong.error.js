"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailOrPasswordWrong = void 0;
const base_error_1 = require("../base.error");
class EmailOrPasswordWrong extends base_error_1.ErrorBase {
    constructor(message = "Email ou senha inválidos, tente novamente!") {
        super(401, message);
    }
    ;
}
exports.EmailOrPasswordWrong = EmailOrPasswordWrong;
//# sourceMappingURL=email-or-password-wrong.error.js.map