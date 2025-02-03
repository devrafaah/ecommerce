"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const firestore_1 = require("firebase-admin/firestore");
class UserRepository {
    constructor() {
        this.collection = (0, firestore_1.getFirestore)().collection("users");
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.collection.get();
            return snapshot.docs.map(doc => {
                return Object.assign({ id: doc.id }, doc.data());
            });
        });
    }
    getUserById(UserId) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.collection.doc(UserId).get();
            if (user.exists) {
                return Object.assign({ id: user.id }, user.data());
            }
            else {
                return null;
            }
        });
    }
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            delete user.senha;
            yield this.collection.add(user);
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let docRef = this.collection.doc(user.id);
            yield docRef.set({
                nome: user.nome,
                email: user.email
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.collection.doc(id).delete();
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map