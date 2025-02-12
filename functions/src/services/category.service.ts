import { NotFoundError } from "../errors/not-found.error.js";
import { ValidationError } from "../errors/validation.error.js";
import { Category } from "../models/category.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductsRepository } from "../repositories/products.repository.js";

export class CategoryService {

    private categoryRepository : CategoryRepository
    private productsRepository : ProductsRepository

    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.productsRepository = new ProductsRepository();
    }

    async getAll() : Promise<Category[]>{
        return await this.categoryRepository.getAllUsers();
    }
    async update(categoryId: string, customCategory : Category){
        const categoryUpdate = await this.categoryRepository.getById(categoryId);

        if(!categoryUpdate) {
            throw new NotFoundError("Categoria não encontrada!");
        };

        categoryUpdate.descricao = customCategory.descricao,
        categoryUpdate.ativa = customCategory.ativa,

        await this.categoryRepository.update(categoryUpdate);
    }
    async delete(categoryId: string){
        if(await this.productsRepository.getCountByCategory(categoryId) > 0){
            throw new ValidationError("Não pode excluir categoria com produtos relacionados!!")
        }
        await this.categoryRepository.delete(categoryId);
    }
    async getById(categoryId : string) : Promise<Category>{
        const category = await this.categoryRepository.getById(categoryId);
        if(!category) {
            throw new NotFoundError("Categoria não encontrada!")
        }

        return category
    }
    async save(category : Category){
        await this.categoryRepository.save(category);
    }
}