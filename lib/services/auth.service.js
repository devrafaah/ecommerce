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
exports.AuthService = void 0;
const email_already_exist_error_1 = require("../errors/AuthenticationError/email-already-exist.error");
const email_or_password_wrong_error_1 = require("../errors/AuthenticationError/email-or-password-wrong.error");
const auth_1 = require("firebase-admin/auth");
const auth_2 = require("firebase/auth");
class AuthService {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, auth_1.getAuth)().createUser({
                email: user.email,
                password: user.senha,
                displayName: user.nome,
            }).catch(error => {
                if (error.code === "auth/email-already-exists") {
                    throw new email_already_exist_error_1.EmailAlreadyExist();
                }
                throw error;
            });
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const props = {
                displayName: user.nome,
                email: user.email
            };
            if (user.senha) {
                props.password = user.senha;
            }
            return (0, auth_1.getAuth)().updateUser(id, props);
        });
    }
    login(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, auth_2.signInWithEmailAndPassword)((0, auth_2.getAuth)(), email, senha).catch(error => {
                if (error.code === "auth/invalid-credential") {
                    throw new email_or_password_wrong_error_1.EmailOrPasswordWrong();
                }
                throw error;
            });
        });
    }
    ;
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, auth_1.getAuth)().deleteUser(id);
        });
    }
    recovery(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, auth_2.sendPasswordResetEmail)((0, auth_2.getAuth)(), email);
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map