import { Response, Request, NextFunction } from 'express';
import { UserService } from '../services/user.service';


export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().getAll());
    }

    static async getUserById(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().getUserById(req.params.id))
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        await new UserService().save(req.body)
        res.status(201).send("Usuário cadastrado com sucesso!");
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        await new UserService().update(req.params.id, req.body);
        res.send({
            message : "Usuario alterado com sucesso !"
        });
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        await new UserService().remove(req.params.id)
        res.status(204).end();
    }

}