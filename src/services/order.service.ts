import { NotFoundError } from "../errors/not-found.error.js";
import { Order, OrderQuery } from "../models/order.model.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";
import { PaymentMethodRepository } from "../repositories/paymentMethod.repository.js";
import { ProductsRepository } from "../repositories/products.repository.js";

export class OrderService {
    private orderRepository : OrderRepository;
    private companyRepository: CompanyRepository;
    private paymentMethodRepository : PaymentMethodRepository;
    private productsRepository : ProductsRepository;

    constructor() {
        this.orderRepository = new OrderRepository()
        this.companyRepository = new CompanyRepository();
        this.paymentMethodRepository = new PaymentMethodRepository();
        this.productsRepository = new ProductsRepository();
    }

    async save(order: Order) : Promise<void> {
        const company = await this.companyRepository.getCompanyById(order.empresa.id!)
        if(!company) {
            throw new NotFoundError("Empresa não encontrada")
        }
        order.empresa = company

        const formaPagamento = await this.paymentMethodRepository.getById(order.formaPagamento.id);
        if(!formaPagamento) {
            throw new NotFoundError("Forma de Pagamento não encontrada");
        }
        order.formaPagamento = formaPagamento

        for(let item of order.items) {
            const produto = await this.productsRepository.getById(item.produto.id)
            if(!produto) {
                throw new NotFoundError("Produto não encontrado!");
            }
            item.produto = produto;
        }
        order.data = new Date();
        return await this.orderRepository.save(order);
    }

    async search(query : OrderQuery) : Promise<Order[]> {
        return this.orderRepository.search(query)
    }
}