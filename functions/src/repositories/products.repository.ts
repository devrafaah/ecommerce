import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Product, productConverter } from "../models/product.model.js";

export class ProductsRepository {

    private collectionReference : CollectionReference<Product>
    constructor(){
        this.collectionReference = getFirestore().collection("products").withConverter(productConverter);
    }
    async getAll() : Promise<Product[]>{
        let snapshot = await this.collectionReference.get();
        return snapshot.docs.map( doc => doc.data());
    }
    async search(categoriaId: string) : Promise<Product[]> {
        const snapshot = await this.collectionReference.where("categoria.id", "==", categoriaId).get()
        return snapshot.docs.map( doc => doc.data());
    }
    async getById(productId : string) : Promise<Product> {
        let doc = await this.collectionReference.doc(productId).get();
        return doc.data()!
    }

    async save(product : Product){
        await this.collectionReference.add(product)
    }


    async update(product : Product) : Promise<void> {
        await this.collectionReference.doc(product.id).set(product);
    }
    async delete(productId: string) : Promise<void> {
        await this.collectionReference.doc(productId).delete();
    }

    async getCountByCategory(categoryId :string) : Promise<number> {
        const snapshotCount = await this.collectionReference.where("categoria.id", "==", categoryId).count().get()
        return snapshotCount.data().count;
    }
}