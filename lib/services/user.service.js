import { NotFoundError } from "../errors/not-found.error.js";
import { UserRepository } from "../repositories/user.repository.js";
import { AuthService } from "./auth.service.js";
export class UserService {
    userRepository;
    authService;
    constructor() {
        this.userRepository = new UserRepository(),
            this.authService = new AuthService();
    }
    async getAll() {
        return this.userRepository.getAll();
    }
    async getUserById(UserId) {
        const user = await this.userRepository.getUserById(UserId);
        if (!user) {
            throw new NotFoundError("Usuário não existe verifique UID");
        }
        return user;
    }
    async save(user) {
        const userAuth = await this.authService.create(user);
        user.id = userAuth.uid;
        await this.userRepository.update(user);
    }
    async update(userId, user) {
        const _user = await this.userRepository.getUserById(userId);
        if (!_user) {
            throw new NotFoundError("Usuario não encontrado");
        }
        _user.nome = user.nome;
        _user.email = user.email;
        await this.userRepository.update(_user);
        await this.authService.update(userId, user);
    }
    async remove(userId) {
        await this.authService.delete(userId);
        await this.userRepository.delete(userId);
    }
}
//# sourceMappingURL=user.service.js.map