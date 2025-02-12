import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { PaymentMethod, paymentMethodConverter } from "../models/payment-method.model.js";

export class PaymentMethodRepository {

    private collectionReference : CollectionReference<PaymentMethod>;

    constructor() {
        this.collectionReference = getFirestore().collection("payment-method").withConverter(paymentMethodConverter)
    }

    async getAll() : Promise<PaymentMethod[]> {
        const snapshot = await this.collectionReference.get();
        return snapshot.docs.map( doc => doc.data());
    };

    async save(paymentMethod : PaymentMethod) {
        await this.collectionReference.add(paymentMethod)
    }

    async update(paymentMethod : PaymentMethod) {
        await this.collectionReference.doc(paymentMethod.id).set(paymentMethod)
    }
    async delete(paymentMethodId: string) {
        await this.collectionReference.doc(paymentMethodId).delete();
    }

    async getById(paymentMethodId : string) : Promise<PaymentMethod | null> {
        const doc = await this.collectionReference.doc(paymentMethodId).get();
        return doc.data() ?? null
    }

}