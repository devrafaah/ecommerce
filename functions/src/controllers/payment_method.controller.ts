import { Response, Request } from "express";
import { PaymentMethodService } from "../services/payment-method.service.js";
import { PaymentMethod } from "../models/payment-method.model.js";


export class PaymentMethodController {
    static async getAll(req: Request, res: Response) {
        res.status(200).send(await new PaymentMethodService().getAll())

    }
    static async save(req: Request, res: Response) {
        let paymentMethod = req.body;
        await new PaymentMethodService().save(paymentMethod)
        res.status(201).send("Método de pagamento adicionado com sucesso!");
    }
    static async getById(req: Request, res: Response){
        let paymentMethodId = req.params.id; 
        res.status(200).send(
            await new PaymentMethodService().getById(paymentMethodId)
        );
    }
    static async delete(req: Request, res: Response) {
        let paymentId = req.params.id;
        await new PaymentMethodService().delete(paymentId);
        res.status(204).end()
    }
    static async update(req: Request, res: Response) {
        let paymentId = req.params.id;
        let payment = req.body as PaymentMethod;
        await new PaymentMethodService().update(paymentId, payment);
        res.status(200).send({
            message: "Pagamento Atualizado com sucesso"
        })
    }
}