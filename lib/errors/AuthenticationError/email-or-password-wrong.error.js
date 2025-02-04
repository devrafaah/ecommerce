import { ErrorBase } from "../base.error.js";
export class EmailOrPasswordWrong extends ErrorBase {
    constructor(message = "Email ou senha inválidos, tente novamente!") {
        super(401, message);
    }
    ;
}
//# sourceMappingURL=email-or-password-wrong.error.js.map