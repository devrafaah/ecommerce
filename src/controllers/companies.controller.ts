import { Request, Response } from "express";
import { CompanyService } from "../services/company.service.js";

export class CompaniesController {
    static async getAll(req: Request, res: Response) {
            res.send(await new CompanyService().getAll());
        }
    
        static async getCompanyById(req: Request, res: Response) {
            res.send(await new CompanyService().getCompanyById(req.params.id))
        }
    
        static async save(req: Request, res: Response) {
            await new CompanyService().save(req.body)
            res.status(201).send("Empresa cadastrado com sucesso!");
        }
    
        static async update(req: Request, res: Response) {
            await new CompanyService().update(req.params.id, req.body);
            res.send({
                message : "Empresa alterado com sucesso !"
            });
        }
    
}