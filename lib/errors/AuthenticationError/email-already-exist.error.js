import { ErrorBase } from "../base.error.js";
export class EmailAlreadyExist extends ErrorBase {
    constructor(message = "O E-mail informado ja esta sendo utilizando por outra pessoa") {
        super(409, message);
    }
}
//# sourceMappingURL=email-already-exist.error.js.map