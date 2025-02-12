import { Joi } from "celebrate";
import { Company } from "./company.model.js";
import { Customer, customerSchema } from "./customer.model.js";
import { Address, orderAddressSchema } from "./address.model.js";
import { PaymentMethod } from "./payment-method.model.js";
import { OrderItem, orderItemSchema } from "./order-item.model.js";
import { DocumentData, FieldValue, FirestoreDataConverter, QueryDocumentSnapshot, Timestamp } from "firebase-admin/firestore";



export class Order {
    id: string;
    empresa: Company
    cliente: Customer
    endereco: Address
    cpfCnpjCupom: string
    data: Date;
    isEntrega: boolean
    formaPagamento: PaymentMethod
    taxaEntrega: number
    items?: OrderItem[]
    status: OrderStatus
    observacoes : string
    subtotal : number
    total : number

    constructor(order: Order | any) {
        this.id = order.id,
        this.empresa = new Company(order.empresa),
        this.cliente = new Customer(order.cliente)
        this.endereco = order.endereco,
        this.cpfCnpjCupom = order.cpfCnpjCupom,
        this.data = order.data instanceof Timestamp ? order.data.toDate() : order.data
        this.isEntrega = order.isEntrega,
        this.formaPagamento = new PaymentMethod(order.formaPagamento),
        this.taxaEntrega = order.taxaEntrega,
        this.items = order.items?.map((item : any) => new OrderItem(item)),
        this.status = order.status ?? OrderStatus.pendente,
        this.observacoes = order.observacoes
        this.subtotal = order.subtotal,
        this.total = order.total
    }

    getSubtotal(): number {
        return this.items?.map(item => item.getTotal()).reduce((total, next) => total + next + 0) ?? 0
    }
    getTotal(): number {
        return this.getSubtotal() + this.taxaEntrega;
    }


}
export const orderConverter: FirestoreDataConverter<Order> = {
    toFirestore: (order: Order): DocumentData => {
        return {
            empresa: {
                id: order.empresa.id,
                logomarca: order.empresa.logomarca,
                cpfCnpj: order.empresa.cpfCnpj,
                razaoSocial: order.empresa.razaoSocial,
                nomeFantasia: order.empresa.nomeFantasia,
                telefone: order.empresa.telefone,
                endereco: order.empresa.endereco,
                localizacao: order.empresa.localizacao,
            },
            cliente: {
                nome: order.cliente.nome,
                telefone: order.cliente.telefone
            },
            endereco: {
                cep : order.endereco.cep,
                logradouro: order.endereco.logradouro,
                numero: order.endereco.numero,
                complemento: order.endereco.complemento,
                cidade: order.endereco.cidade,
                uf: order.endereco.uf
            },
            cpfCnpjCupom: order.cpfCnpjCupom,
            data: FieldValue.serverTimestamp(),
            isEntrega: order.isEntrega,
            formaPagamento: {
                id: order.formaPagamento.id,
                descricao: order.formaPagamento.descricao,
            },
            taxaEntrega: order.taxaEntrega,
            status: order.status,
            observaoes : order.observacoes,
            subtotal : order.getSubtotal(),
            total : order.getTotal()
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Order => {
        return new Order({
            id: snapshot.id,
            ...snapshot.data()
        })
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
    empresa: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    cliente: customerSchema.required(),
    endereco: Joi.alternatives().conditional(
        "isEntrega", {
        is: true,
        then: orderAddressSchema.required(),
        otherwise: Joi.object().allow(null).default(null)
    }
    ),
    cpfCnpjCupom: Joi.alternatives().try(
        Joi.string().length(11).required(),
        Joi.string().length(14).required()
    ).default(null),
    isEntrega: Joi.boolean().required(),
    formaPagamento: Joi.object().keys({
        id: Joi.string().trim().required()
    }).required(),
    taxaEntrega: Joi.number().min(0).required(),
    items: Joi.array().items(orderItemSchema).min(1).required(),
    status: Joi.string().only().allow(OrderStatus.pendente).default(OrderStatus.pendente),
    observacoes : Joi.string().trim().allow(null).default(null)
})

export const updateStatusOrderSchema = Joi.object().keys({
    status : Joi.string().only().allow(
        OrderStatus.aprovado, OrderStatus.entrega,
        OrderStatus.concluido, OrderStatus.cancelado
    ).required()
})


export interface OrderQuery {
    empresaId?: string,
    dataInicio?: Date,
    dataFinal?: Date,
    status?: OrderStatus
}

export const searchParamsOrderQuerySchema = Joi.object().keys({
    empresaId: Joi.string().trim(),
    dataInicio: Joi.date(),
    dataFinal: Joi.date(),
    status: Joi.string().only().allow(...Object.values(OrderStatus))
})