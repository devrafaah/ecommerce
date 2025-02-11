import { PaymentMethod } from "../models/payment-method.model.js";
import { PaymentMethodRepository } from "../repositories/paymentMethod.repository.js";

export class PaymentMethodService {
    private paymentMethodRepository : PaymentMethodRepository;
    
    constructor(){
        this.paymentMethodRepository = new PaymentMethodRepository();
    }

    async getAll() : Promise<PaymentMethod[]>{
        return await this.paymentMethodRepository.getAll();
    }
    async save(paymentMethod: PaymentMethod) : Promise<void> {
        return await this.paymentMethodRepository.save(paymentMethod);
    }
    async getById(paymentId: string) : Promise<PaymentMethod>{
        return await this.paymentMethodRepository.getById(paymentId);
    }
    async delete(paymentId: string) : Promise<void>{
        await this.paymentMethodRepository.delete(paymentId)
    }
    async update(paymentMethodId: string, paymentMethod: PaymentMethod) : Promise<void>{
        let _paymentMethod = await this.getById(paymentMethodId);

        _paymentMethod.descricao = paymentMethod.descricao,
        _paymentMethod.ativa = paymentMethod.ativa

        await this.paymentMethodRepository.update(_paymentMethod);
    }
}