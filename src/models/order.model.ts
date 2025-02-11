import { Joi } from "celebrate";
import { Company } from "./company.model.js";
import { Customer, customerSchema } from "./customer.model.js";
import { Address, orderAddressSchema } from "./address.model.js";
import { PaymentMethod } from "./payment-method.model.js";
import { OrderItem, orderItemSchema } from "./order-item.model.js";
import { Timestamp } from "firebase-admin/firestore";


export class Order {
    id : string;
    empresa : Company
    cliente : Customer
    endereco : Address
    cpfCnpjCupom: string
    data : Date;
    isEntrega : boolean
    formaPagamento: PaymentMethod
    taxaEntrega : number
    items : OrderItem[]
    status : OrderStatus
    
    constructor(data: any){
        this.id = data.id,
        this.empresa = data.empresa,
        this.cliente = data.cliente,
        this.endereco = data.endereco,
        this.cpfCnpjCupom = data.cpfCnpjCupom,
        this.data = data.data instanceof Timestamp ? data.data.toDate() : data.data
        this.isEntrega = data.isEntrega,
        this.formaPagamento = data.formaPagamento,
        this.taxaEntrega = data.taxaEntrega,
        this.items = data.items,
        this.status = data.status
    }
    
}

export enum OrderStatus {
    pendente = "pendente",
    aprovado = "aprovado",
    entrega = "entrega",
    concluido = "concluido",
    cancelado = "cancelado"
}

export const newOrderSchema = Joi.object().keys({
    empresa : Joi.object().keys({
        id : Joi.string().trim().required()
    }).required(),
    cliente : customerSchema.required(),
    endereco : Joi.alternatives().conditional(
        "isEntrega", {
            is: true, 
            then: orderAddressSchema.required(), 
            otherwise: Joi.object().allow(null).default(null)
        }
    ),
    cpfCnpjCupom : Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).default(null),
    isEntrega: Joi.boolean().required(),
    formaPagamento : Joi.object().keys({
        id : Joi.string().trim().required()
    }).required(),
    taxaEntrega : Joi.number().min(0).required(),
    items : Joi.array().items(orderItemSchema).min(1).required(),
    status : Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente)
})


export interface OrderQuery {
    empresaId?: string,
    dataInicio? : Date,
    dataFinal? : Date,
    status? : OrderStatus
}

export const searchParamsOrderQuerySchema = Joi.object().keys({
    empresaId : Joi.string().trim(),
    dataInicio : Joi.date(),
    dataFinal : Joi.date(),
    status : Joi.string().only().allow(...Object.values(OrderStatus))
})