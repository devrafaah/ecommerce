import {Response, Request} from 'express';
import { OrderService } from '../services/order.service.js';
import { Order } from '../models/order.model.js';

export class OrderController{
    static async save(req: Request, res: Response) {
        await new OrderService().save(new Order(req.body))
        res.status(201).send({
            message : "Pedido criado com sucesso!"
        });
    }

    static async search(req: Request, res: Response) {
        const orders = await new OrderService().search(req.query);
        res.send(orders)
    }

    static async getProdutos(req: Request, res: Response) {
        const produtos = await new OrderService().getProdutos(req.params.id);
        res.status(200).send(produtos)
    }
    static async getById(req: Request, res: Response) {
        const pedido = await new OrderService().getById(req.params.id);
        res.send(pedido);
    }
    static async updateStatus(req: Request, res: Response) {
        const pedidoID = req.params.id;
        const status = req.body.status;
        await new OrderService().updateStatus(pedidoID, status)
        res.send({
            message : "Update feito com sucesso"
        })
    }
}