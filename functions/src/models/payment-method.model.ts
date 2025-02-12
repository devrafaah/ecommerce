import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class PaymentMethod {
    id: string
    descricao : string
    ativa : boolean

    constructor(paymentMethod : PaymentMethod | any){
        this.id = paymentMethod.id,
        this.descricao = paymentMethod.descricao,
        this.ativa = paymentMethod.ativa
    }
}

export const paymentMethodConverter : FirestoreDataConverter<PaymentMethod> = {
    toFirestore: (paymentMethod: PaymentMethod): DocumentData => {
        return {
            descricao : paymentMethod.descricao
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): PaymentMethod =>{
        return new PaymentMethod({
            id : snapshot.id,
            ...snapshot.data()
        })
    }
}

export const newPaymentSchema = Joi.object().keys({
    descricao: Joi.string().min(3).required(),
    ativa : Joi.boolean().only().allow(true).default(true)
});

export const updatePaymentSchema = Joi.object().keys({
    descricao : Joi.string().min(3).required(),
    ativa: Joi.boolean().required(),
})