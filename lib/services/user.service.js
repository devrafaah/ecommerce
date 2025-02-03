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
exports.UserService = void 0;
const not_found_error_1 = require("../errors/not-found.error");
const user_repository_1 = require("../repositories/user.repository");
const auth_service_1 = require("./auth.service");
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository(),
            this.authService = new auth_service_1.AuthService();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.getAll();
        });
    }
    getUserById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserById(UserId);
            if (!user) {
                throw new not_found_error_1.NotFoundError("Usuário não existe verifique UID");
            }
            return user;
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userAuth = yield this.authService.create(user);
            user.id = userAuth.uid;
            yield this.userRepository.update(user);
        });
    }
    update(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const _user = yield this.userRepository.getUserById(userId);
            if (!_user) {
                throw new not_found_error_1.NotFoundError("Usuario não encontrado");
            }
            _user.nome = user.nome;
            _user.email = user.email;
            yield this.userRepository.update(_user);
            yield this.authService.update(userId, user);
        });
    }
    remove(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.delete(userId);
            yield this.userRepository.delete(userId);
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map