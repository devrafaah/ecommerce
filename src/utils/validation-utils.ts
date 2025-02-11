import { ValidationError } from "../errors/validation.error.js";

export const isCloudiaryUrlValid = (urlString: string): boolean => {
    try {
        const url = new URL(urlString);
        if (url.host != "res.cloudinary.com") {
            throw new ValidationError("URL de origem invalida!")
        }
        
        return true;
    } catch (error) {
        if (error instanceof ValidationError) {
            throw error;
        }
        return false;

    }
}