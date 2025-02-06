import { Company } from "../models/company.model.js";
import { NotFoundError } from "../errors/not-found.error.js";
import { CompanyRepository } from "../repositories/company.repository.js";
import { UploadFileService } from "./upload.service.js";
import { ValidationError } from "../errors/validation.error.js";

export class CompanyService {

    private companyRepository : CompanyRepository;
    private uploadFileService : UploadFileService;

    constructor() {
        this.companyRepository = new CompanyRepository()
        this.uploadFileService = new UploadFileService()
    }

    async getAll(): Promise<Company[]> {
        return this.companyRepository.getAll()

    }


    async getCompanyById(UserId: string): Promise<Company> {
        const company = await this.companyRepository.getCompanyById(UserId);
        if(!company) {
            throw new NotFoundError("Empresa não encontrada");
        }
        return company;
    }

    async save(company : Company) : Promise<void>{
        const urlFile = await this.uploadFileService.upload(company.logomarca);
        company.logomarca = urlFile;
        console.log(urlFile)
        await this.companyRepository.save(company);
    }

    async update(userId : string, company : Company) {
        const _company = await this.companyRepository.getCompanyById(userId);
        if(!_company) {
            throw new NotFoundError("Empresa não encontrado");
        }
        if(!this.isValidUrl(company.logomarca)){
            _company.logomarca = await this.uploadFileService.upload(company.logomarca);
        }
        _company.logomarca = company.logomarca,
        _company.cpfCnpj = company.cpfCnpj,
        _company.razaoSocial = company.razaoSocial,
        _company.nomeFantasia = company.nomeFantasia,
        _company.telefone = company.telefone,
        _company.horarioFuncionamento = company.horarioFuncionamento,
        _company.endereco = company.endereco,
        _company.localizacao = company.localizacao,
        _company.taxaEntrega = company.taxaEntrega,
        _company.ativa = company.ativa

        await this.companyRepository.update(_company);
    }

    private isValidUrl(urlString: string) : boolean {
        try {
            const url = new URL(urlString);
            if(url.host != "res.cloudinary.com"){
                throw new ValidationError("URL de origem invalida!")
            }
            return true;
        } catch (error) {
            if(error instanceof ValidationError) {
                throw error;
            }
            return false;
            
        }
    }
}