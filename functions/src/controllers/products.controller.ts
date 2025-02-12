import { Request, Response } from "express";
import { ProductsService } from "../services/products.service.js";

export class productsController {

    static async getAll(req: Request, res: Response){
        res.status(200).send(await new ProductsService().getAll());
    }

    static async search(req: Request, res: Response) {
        const categoriaId = req.query.categoriaId as string
        res.send(await new ProductsService().search(categoriaId));
    }
    static async getById(req: Request, res: Response){
        res.status(200).send(await new ProductsService().getById(req.params.id));
    }
    static async save(req: Request, res: Response){
        await new ProductsService().save(req.body);
        res.status(201).send({
            message : "Produto Adicionado com sucesso!"
        });
    }
    static async update(req: Request, res: Response){
        const productId = req.params.id;
        const product = req.body;
        await new ProductsService().update(productId, product)

        res.status(200).send({
            message : "Usuario Atualizado com sucesso!!"
        })
    }
    static async delete(req: Request, res: Response){
        await new ProductsService().delete(req.params.id);
        res.status(204).end();
    }
}