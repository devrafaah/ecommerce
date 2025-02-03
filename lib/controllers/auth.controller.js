"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, senha } = req.body;
            const userRecord = yield new auth_service_1.AuthService().login(email, senha);
            const token = yield userRecord.user.getIdToken(true);
            res.send({
                token: token
            });
        });
    }
    static recovery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            yield new auth_service_1.AuthService().recovery(email);
            res.end();
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map