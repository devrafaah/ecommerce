import { Joi } from "celebrate";
import { Product } from "./product.model.js";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";


export class OrderItem {
    id : string
    produto : Product
    qtde : number
    observacao : string

    constructor(orderItem : OrderItem | any) {
        this.id = orderItem.id,
        this.produto = new Product(orderItem.produto),
        this.qtde = orderItem.qtde,
        this.observacao = orderItem.observacao
    }

    getTotal(): number {
        return this.qtde * this.produto.preco;
    }
}

export const orderItemConverter : FirestoreDataConverter<OrderItem> ={
    toFirestore: (orderItem : OrderItem): DocumentData => {
        return {
            produto: {
                id: orderItem.produto.id,
                nome: orderItem.produto.nome,
                descricao: orderItem.produto.descricao,
                preco: orderItem.produto.preco,
                imagem: orderItem.produto.imagem,
                categoria: {
                    id : orderItem.produto.categoria.id,
                    descricao : orderItem.produto.categoria.descricao
                }
            },
            qtde: orderItem.qtde,
            observacao: orderItem.observacao
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): OrderItem => {
        return new OrderItem({
            id : snapshot.id,
            ...snapshot.data()
        })
    }
}


export const orderItemSchema = Joi.object().keys({
    produto : Joi.object().keys({
        id : Joi.string().trim().required()
    }).required(),
    qtde : Joi.number().integer().positive().required(),
    observacao : Joi.string().trim().allow(null).default(null)
});