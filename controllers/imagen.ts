import { Buffer } from 'buffer';
import folder from 'fs/promises';

const multer = require("multer");
const path = require("path");
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: (arg0: null, arg1: string) => any) => cb(null, ".uploads"), // cb -> callback
    filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: string) => void) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});

export const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).single("image");

export class ImagenController {

    static convertirAImagenes(array: any) {
        //console.log(array.length);
        for (let i = 0; i < array.length; i++) {
            array[i].imagen = Buffer.from(array[i].imagen).toString('base64');
        }
        return array;
    }

    static async vaciarCarpeta() {
        let dirPath = ".uploads";
        try {
            let files = await folder.readdir(dirPath);
            const deleteFilePromises = files.map(file =>
                folder.unlink(path.join(dirPath, file)),
            );
            await Promise.all(deleteFilePromises);
        } catch (e) {
            console.log(e);
        }
    }

    static async convertirABuffer(img: any) {
        console.log(img);

        return fs.readFileSync(img[0].path);
    }
}