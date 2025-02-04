import { UserService } from '../services/user.service.js';
export class UsersController {
    static async getAll(req, res) {
        res.send(await new UserService().getAll());
    }
    static async getUserById(req, res) {
        res.send(await new UserService().getUserById(req.params.id));
    }
    static async save(req, res) {
        await new UserService().save(req.body);
        res.status(201).send("Usuário cadastrado com sucesso!");
    }
    static async update(req, res) {
        await new UserService().update(req.params.id, req.body);
        res.send({
            message: "Usuario alterado com sucesso !"
        });
    }
    static async delete(req, res) {
        await new UserService().remove(req.params.id);
        res.status(204).end();
    }
}
//# sourceMappingURL=users.controller.js.map