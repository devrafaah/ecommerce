import {Joi} from 'celebrate';
import { DocumentData, FirestoreDataConverter, QueryDocumentSnapshot } from 'firebase-admin/firestore';

export class Category {
    id : string
    descricao : string
    ativa: boolean

    constructor(category : Category | any = {}){
        this.id = category.id,
        this.descricao = category.descricao,
        this.ativa = category.ativa ?? true
    }
}

export const categoryConverter : FirestoreDataConverter<Category> = {
    toFirestore: (category: Category): DocumentData => {
        return {
            descricao : category.descricao
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot): Category  => {
        return new Category({
            id: snapshot.id,
            ...snapshot.data()
        })
    }
}


export const newCategorySchema = Joi.object().keys({
    descricao : Joi.string().required(),
    ativa : Joi.boolean().required()
});

export const updateCategorySchema = Joi.object().keys({
    descricao : Joi.string(),
    ativa : Joi.boolean().required()
});