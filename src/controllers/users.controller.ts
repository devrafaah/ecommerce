import {Response, Request} from 'express';

interface User {
    id : number
    nome : string,
    email : string
}
let users : User[] = []
let id = 0;

function novoUsuario(id: number, nome:string, email: string) : User {
    const usuario : User = {id,nome,email}
    return usuario;
}

export class UsersController {
    static getAll(req: Request, res: Response){
        res.send(users);
    }

    static getUserById(req: Request, res: Response) {
        let userId = Number(req.params.id);
        let user = users.find(user => user.id === userId);
        res.send(user);
    }

    static save(req: Request, res: Response) {
        let user : User = req.body;
        user.id = ++id;
        users.push(
            novoUsuario(user.id, user.nome, user.email)
        );
        res.send("Usuario Adicionado com sucesso -> " + user.id);
    }

    static update(req: Request, res: Response) {
        let userId = Number(req.params.id);
        let user = req.body;
    
        let indexOf = users.findIndex( (usuario: User) => usuario.id === userId);
    
        users[indexOf].email = user.email;
        users[indexOf].nome = user.nome;
    
        res.send({
            message : "Atualizado com sucesso"
        });
    
    }

    static delete(req: Request, res: Response){
        let userId = Number(req.params.id);
    
        let findIndex = users.findIndex((user : User) => user.id === userId);
        users.splice(findIndex, 1);
    
        res.send({
            message : "Usuario removido",
        });
    }

}