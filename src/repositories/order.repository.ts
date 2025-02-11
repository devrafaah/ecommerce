import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, OrderQuery } from "../models/order.model.js";
import dayjs from "dayjs";

export class OrderRepository {

    private collectionReference : CollectionReference;
    constructor(){
        this.collectionReference = getFirestore().collection("orders");
    }

    async save(order: Order) : Promise<void>{
        await this.collectionReference.add(order);
    }
    async search(queryParams : OrderQuery) : Promise<Order[]> {
        let query : FirebaseFirestore.Query = this.collectionReference;

        
        if(queryParams.empresaId) {
            query = query.where("empresa.id", "==", queryParams.empresaId);
        }
        
        if(queryParams.dataInicio) {
            queryParams.dataInicio = dayjs(queryParams.dataInicio).add(1, 'day').startOf('day').toDate()
            query = query.where("data", ">=", queryParams.dataInicio);
        }

        if(queryParams.dataFinal) {
            queryParams.dataFinal = dayjs(queryParams.dataFinal).add(1, 'day').endOf('day').toDate();
            query = query.where("data", "<=", queryParams.dataFinal);
        }

        if(queryParams.status) {
            query = query.where("status", "==", queryParams.status)
        }
        
        const snapshot = await query.get()
        return snapshot.docs.map( doc => {
            return new Order({
                id: doc.id,
                ...doc.data()
            })
        }) as Order[]
    }
}