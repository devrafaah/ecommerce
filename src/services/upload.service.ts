import { v2 as cloudinary } from "cloudinary";
import { fileTypeFromFile } from 'file-type';


export class UploadFileService {

    async upload(base64: string) : Promise<string> {
        let baseUrlImage = base64;
        const fileType = await fileTypeFromFile(baseUrlImage);

        await cloudinary.uploader.upload(
            "data:image/"+fileType?.ext+";base64," + baseUrlImage, {
                public_id : "Naruto Uzumaki",
                folder : "imagens/logomarca",
                format : fileType?.ext,
            }
        ).then(results => {
            baseUrlImage = results.secure_url;
        }).catch (error => {
            throw new Error("Erro Inesperado : "+error);
        });
        console.log("URL : " + baseUrlImage);
        return baseUrlImage;
    }
}