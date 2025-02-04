import { getFirestore } from "firebase-admin/firestore";
export class UserRepository {
    collection;
    constructor() {
        this.collection = getFirestore().collection("users");
    }
    async getAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
    }
    async getUserById(UserId) {
        let user = await this.collection.doc(UserId).get();
        if (user.exists) {
            return {
                id: user.id,
                ...user.data()
            };
        }
        else {
            return null;
        }
    }
    async save(user) {
        delete user.senha;
        await this.collection.add(user);
    }
    async update(user) {
        let docRef = this.collection.doc(user.id);
        await docRef.set({
            nome: user.nome,
            email: user.email
        });
    }
    async delete(id) {
        await this.collection.doc(id).delete();
    }
}
//# sourceMappingURL=user.repository.js.map