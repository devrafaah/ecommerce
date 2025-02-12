import { Joi } from "celebrate";
import { phoneRegexPattern } from "../utils/regexs-utils.js";
import { FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";


export class Customer {
    nome: string
    telefone: string

    constructor(customer: Customer | any) {
        this.nome = customer.nome,
        this.telefone = customer.telefone
    }
};

export const customerConverter : FirestoreDataConverter<Customer> = {
    toFirestore:  (customer: Customer): FirebaseFirestore.WithFieldValue<FirebaseFirestore.DocumentData> => {
        return {
            nome : customer.nome,
            telefone : customer.telefone
        }
    },
    fromFirestore:  (snapshot: QueryDocumentSnapshot): Customer => {
        return new Customer({
            ...snapshot.data()
        })
    }
}

export const customerSchema = Joi.object().keys({
    nome: Joi.string().trim().min(5).required(),
    telefone: Joi.string().regex(phoneRegexPattern).required()
})