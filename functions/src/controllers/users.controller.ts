import { Response, Request } from 'express';
import { UserService } from '../services/user.service.js';


export class UsersController {
    static async getAll(req: Request, res: Response) {
        res.send(await new UserService().getAll());
    }

    static async getUserById(req: Request, res: Response) {
        res.send(await new UserService().getUserById(req.params.id))
    }

    static async save(req: Request, res: Response) {
        await new UserService().save(req.body)
        res.status(201).send("Usuário cadastrado com sucesso!");
    }

    static async update(req: Request, res: Response) {
        await new UserService().update(req.params.id, req.body);
        res.send({
            message : "Usuario alterado com sucesso !"
        });
    }

    static async delete(req: Request, res: Response) {
        await new UserService().remove(req.params.id)
        res.status(204).end();
    }

}