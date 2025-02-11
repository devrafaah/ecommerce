import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Category } from '../models/category.model.js';

export class CategoryRepository {
    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("categories");
    }


    async getAllUsers(): Promise<Category[]> {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        }) as Category[];
    }


    async getById(categoryId: string): Promise<Category | null> {
        let company = await this.collection.doc(categoryId).get();
        if (company.exists) {
            return {
                id: company.id,
                ...company.data()
            } as Category;
        }else{
            return null
        }
    }

    async save(category: Category): Promise<void> {
        await this.collection.add(category);
    }

    async update(category: Category): Promise<void> {
        let docRef = this.collection.doc(category.id!);
        await docRef.set(category);
    }

    async delete(id : string) {
        await this.collection.doc(id).delete(); 
    }
}