import { CollectionReference, getFirestore, QuerySnapshot } from "firebase-admin/firestore";
import { Product } from "../models/product.model.js";
import { NotFoundError } from "../errors/not-found.error.js";

export class ProductsRepository {

    private collectionReference : CollectionReference
    constructor(){
        this.collectionReference = getFirestore().collection("products");
    }
    async getAll() : Promise<Product[]>{
        let snapshot = await this.collectionReference.get();
        return this.snapshotToArray(snapshot)
    }
    async search(searchQuery: string) : Promise<Product[]> {
        const snapshot = await this.collectionReference.where("categoria.id", "==", searchQuery).get()
        return this.snapshotToArray(snapshot);
    }
    async getById(productId : string) : Promise<Product> {
        let product = await this.collectionReference.doc(productId).get();
        if(!product.exists) {
            throw new NotFoundError("Erro Produto não encontrado!");
        }

        return {
            id : product.id,
            ...product.data()
        } as Product
    }

    async save(product : Product){
        await this.collectionReference.add(product)
    }


    async update(product : Product) : Promise<void> {
        await this.collectionReference.doc(product.id).set({
            nome : product.nome,
            descricao : product.descricao,
            preco : product.preco,
            categoria : product.categoria,
            imagem : product.imagem,
            ativo : product.ativa,
        });
    }
    async delete(productId: string) : Promise<void> {
        await this.collectionReference.doc(productId).delete();
    }

    private snapshotToArray(snapshot: QuerySnapshot): Product[] {
        return snapshot.docs.map(doc => {
            return {
                id : doc.id,
                ...doc.data()
            };
        }) as Product[];

    }

    async getCountByCategory(categoryId :string) : Promise<number> {
        const snapshotCount = await this.collectionReference.where("categoria.id", "==", categoryId).count().get()
        return snapshotCount.data().count;
    }
}