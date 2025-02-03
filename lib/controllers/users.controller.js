"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
let users = [];
let id = 0;
function novoUsuario(id, nome, email) {
    const usuario = { id, nome, email };
    return usuario;
}
class UsersController {
    static getAll(req, res) {
        res.send(users);
    }
    static getUserById(req, res) {
        let userId = Number(req.params.id);
        let user = users.find(user => user.id === userId);
        res.send(user);
    }
    static save(req, res) {
        let user = req.body;
        user.id = ++id;
        users.push(novoUsuario(user.id, user.nome, user.email));
        res.send("Usuario Adicionado com sucesso -> " + user.id);
    }
    static update(req, res) {
        let userId = Number(req.params.id);
        let user = req.body;
        let indexOf = users.findIndex((usuario) => usuario.id === userId);
        users[indexOf].email = user.email;
        users[indexOf].nome = user.nome;
        res.send({
            message: "Atualizado com sucesso"
        });
    }
    static delete(req, res) {
        let userId = Number(req.params.id);
        let findIndex = users.findIndex((user) => user.id === userId);
        users.splice(findIndex, 1);
        res.send({
            message: "Usuario removido",
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map