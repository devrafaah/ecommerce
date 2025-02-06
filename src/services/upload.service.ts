import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";
import { fileTypeFromBuffer } from 'file-type';
import { ValidationError } from "../errors/validation.error.js";


export class UploadFileService {

    async upload(base64: string): Promise<string> {


        const buffer = Buffer.from(base64, 'base64');

        const fileType = await fileTypeFromBuffer(buffer);
        if (!fileType) {
            throw new ValidationError("Extensão do arquivo não é válida")
        }
        if (fileType.mime !== "image/jpeg" && fileType.mime !== "image/png") {
            throw new ValidationError("A imagem precisa ser PNG ou JPEG!")
        }

        const dataURI = `data:${fileType.mime};base64,${base64}`;
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "imagens/logomarca",
            public_id: randomUUID().toString(),
            resource_type: 'auto'
        });
        return result.secure_url;


    }
}