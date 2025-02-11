import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod } from "../models/payment-method.model.js";
import { NotFoundError } from "../errors/not-found.error.js";

export class PaymentMethodRepository {

    private collectionReference : CollectionReference;

    constructor() {
        this.collectionReference = getFirestore().collection("payment-method")
    }

    async getAll() : Promise<PaymentMethod[]> {
        let snapshot = await this.collectionReference.get();
        return snapshot.docs.map( doc => {
            return {
                id : doc.id,
                ...doc.data()
            } as PaymentMethod
        }) as PaymentMethod[]
    };

    async save(paymentMethod : PaymentMethod) {
        await this.collectionReference.add(paymentMethod)
    }

    async update(paymentMethod : PaymentMethod) {
        await this.collectionReference.doc(paymentMethod.id).set({
            descricao : paymentMethod.descricao,
            ativa : paymentMethod.ativa
        })
    }
    async delete(paymentMethodId: string) {
        await this.collectionReference.doc(paymentMethodId).delete();
    }

    async getById(paymentMethodId : string) : Promise<PaymentMethod> {
        let paymentMethod = await this.collectionReference.doc(paymentMethodId).get();
        if(!paymentMethod.exists){
            throw new NotFoundError("Metodo de Pagamento não encontrado");
        }else{
            return {
                id : paymentMethod.id,
                ...paymentMethod.data()
            } as PaymentMethod
        }
    }

}