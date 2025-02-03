"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailAlreadyExist = void 0;
const base_error_1 = require("../base.error");
class EmailAlreadyExist extends base_error_1.ErrorBase {
    constructor(message = "O E-mail informado ja esta sendo utilizando por outra pessoa") {
        super(409, message);
    }
}
exports.EmailAlreadyExist = EmailAlreadyExist;
//# sourceMappingURL=email-already-exist.error.js.map