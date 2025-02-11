import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service.js";

export class categoryController {

    static async getAll(req: Request, res: Response, next: NextFunction) {

        res.status(200).send(
            await new CategoryService().getAll()
        );
    }
    static async save(req: Request, res: Response, next: NextFunction) {
        const category = req.body;
        await new CategoryService().save(category)
        res.status(201).send({
            message : "Categoria criada com sucesso!"
        });
    }
    static async update(req: Request, res: Response, next: NextFunction) {
        const categoryId = req.params.id;
        const customCategory = req.body;
        await new CategoryService().update(categoryId, customCategory)
        res.status(200).send({
            message : "Update feito com sucesso !!"
        });
    }
    static async delete(req: Request, res: Response, next: NextFunction) {
        const categoryId = req.params.id;
        await new CategoryService().delete(categoryId)
        res.status(204).end()
    }
    static async getById(req: Request, res: Response, next: NextFunction) {
        res.status(200).send(await new CategoryService().getById(req.params.id));
    }
}