import { CollectionReference, getFirestore } from "firebase-admin/firestore";
import { Company, companyConverter } from "../models/company.model.js";

export class CompanyRepository {

    private collection: CollectionReference;

    constructor() {
        this.collection = getFirestore().collection("companies");
    }

    async getAll(): Promise<Company[]> {
        const snapshot = await this.collection.withConverter(companyConverter).get();
        return snapshot.docs.map(doc => doc.data());
    }

    async getCompanyById(companyId: string): Promise<Company | null> {
        let company = await this.collection.doc(companyId).withConverter(companyConverter).get();
        return company.data() ?? null;
    }

    async save(company: Company): Promise<void> {
        await this.collection.withConverter(companyConverter).add(company);
    }

    async update(company: Company): Promise<void> {
        await this.collection
            .withConverter(companyConverter)
            .doc(company.id!)
            .set(company);
    }
}