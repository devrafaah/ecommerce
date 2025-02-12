import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Order, orderConverter, OrderQuery, OrderStatus } from "../models/order.model.js";
import dayjs from "dayjs";
import { OrderItem, orderItemConverter } from "../models/order-item.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
//import { orderItemConverter } from "../models/order-item.model.js";

export class OrderRepository {

    private collectionReference: CollectionReference<Order>;
    constructor() {
        this.collectionReference = getFirestore().collection("orders").withConverter(orderConverter);
    }

    async save(order: Order): Promise<void> {
        const batch = getFirestore().batch();

        // Cabeçalho do pedido
        const orderRef = this.collectionReference.doc();
        batch.create(orderRef, order); //criar um novo pedido na coleção dentro do lote/batch


        // Itens do pedido
        const produtoRef = orderRef.collection("produtos").withConverter(orderItemConverter);
        for (let produto of order.items!) {
            batch.create(produtoRef.doc(), produto)
        }
        await batch.commit();
    }
    async search(queryParams: OrderQuery): Promise<Order[]> {
        let query: FirebaseFirestore.Query<Order> = this.collectionReference;


        if (queryParams.empresaId) {
            query = query.where("empresa.id", "==", queryParams.empresaId);
        }

        if (queryParams.dataInicio) {
            queryParams.dataInicio = dayjs(queryParams.dataInicio).add(1, 'day').startOf('day').toDate()
            query = query.where("data", ">=", queryParams.dataInicio);
        }

        if (queryParams.dataFinal) {
            queryParams.dataFinal = dayjs(queryParams.dataFinal).add(1, 'day').endOf('day').toDate();
            query = query.where("data", "<=", queryParams.dataFinal);
        }

        if (queryParams.status) {
            query = query.where("status", "==", queryParams.status)
        }

        const snapshot = await query.get()
        return snapshot.docs.map(doc => doc.data()) ?? null
    }

    async getProdutos(pedidoId: string): Promise<OrderItem[]> {
        const pedidoRef = this.collectionReference.doc(pedidoId);
        const snapshot = await pedidoRef.collection("produtos").withConverter(orderItemConverter).get()
        return snapshot.docs.map(doc => doc.data());

    }

    async getById(pedidoId: string): Promise<Order> {
        const order = (await this.collectionReference.doc(pedidoId).get()).data();
        if (!order) {
            throw new NotFoundError("Pedido nao encontrado")
        }
        order.items = await this.getProdutos(pedidoId);
        return order;
    }

    async updateStatus(pedidoId: string, status: OrderStatus){
        const ref = this.collectionReference.withConverter(null).doc(pedidoId)
        await ref.set({
            status : status
        }, {
            merge : true
        })
    }
}