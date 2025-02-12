import { Joi } from "celebrate";
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from "firebase-admin/firestore";

export class User {
    id : string
    nome : string
    email : string
    senha? : string

    constructor(user : User | any){
        this.id = user.id,
        this.nome = user.nome,
        this.email = user.email,
        this.senha = user.senha
    }
}

export const userConverter : FirestoreDataConverter<User> = {
    toFirestore: (user: User): DocumentData => {
        return {
            nome : user.nome,
            email : user.email
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): User => {
        return new User ({
            id : snapshot.id,
            ...snapshot.data()
        });
    }
}

export const AuthLoginSchema = Joi.object().keys({
    email : Joi.string().email().required(),
    senha : Joi.string().min(6).required()
});

export const AuthRecoverySchema = Joi.object().keys({
    email : Joi.string().email().required()
});

export const AuthUpdateSchema = Joi.object().keys({
    nome : Joi.string().required(),
    email : Joi.string().email().required(),
    senha : Joi.string().min(6)
});

export const userSchema = Joi.object().keys({
    nome : Joi.string().required(),
    email : Joi.string().email().required(),
    senha : Joi.string().min(6).required()
});