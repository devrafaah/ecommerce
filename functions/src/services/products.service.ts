import { NotFoundError } from "../errors/not-found.error.js";
import { Product } from "../models/product.model.js";
import { CategoryRepository } from "../repositories/category.repository.js";
import { ProductsRepository } from "../repositories/products.repository.js";
import { isCloudiaryUrlValid } from "../utils/validation-utils.js";
import { UploadFileService } from "./upload.service.js";

export class ProductsService {

    private productsRepository: ProductsRepository;
    private categoryRepository: CategoryRepository;
    private uploadFileService: UploadFileService;

    constructor() {
        this.productsRepository = new ProductsRepository()
        this.uploadFileService = new UploadFileService()
        this.categoryRepository = new CategoryRepository();
    }
    async getAll(): Promise<Product[]> {
        return this.productsRepository.getAll();
    }
    async search(categoryId: string) : Promise<Product[]> {
        return this.productsRepository.search(categoryId);
    }
    async getById(productId: string): Promise<Product> {
        const product = this.productsRepository.getById(productId);
        if(!product) {
            throw new NotFoundError("Produto não encontrado")
        }
        return product
    }

    async save(product: Product) {
        const category = await this.getCategory(product.categoria.id);
        if(!isCloudiaryUrlValid(product.imagem)){
            product.imagem = await this.uploadFileService.upload(product.imagem, "images/products");
        }
        product.categoria = category
        this.productsRepository.save(product);
    }

    async update(productId: string, product: Product): Promise<void> {
        const _product = await this.getById(productId);
        const categoria = await this.getCategory(product.categoria.id);

        this.imageBase64orCloudinary(product, _product!);
        
        _product.nome = product.nome,
        _product.preco = product.preco,
        _product.categoria = categoria
        _product.descricao = product.descricao,
        _product.ativa = product.ativa

        await this.productsRepository.update(_product!);
    }

    async delete(productId: string) {
        this.productsRepository.delete(productId);
    }

    private async imageBase64orCloudinary(product: Product, _product : Product) {
        if(!isCloudiaryUrlValid(product.imagem)){
            _product.imagem = await this.uploadFileService.upload(product.imagem, "images/products");
        }else {
            _product.imagem = product.imagem
        }
    }

    private async getCategory(id: string) {
        const categoria = await this.categoryRepository.getById(id);
        if (!categoria) {
            throw new NotFoundError("Categoria não encontrada");
        };

        return categoria
    }


}