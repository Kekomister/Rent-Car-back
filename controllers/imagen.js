"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagenController = exports.handleMultipartData = void 0;
const buffer_1 = require("buffer");
const promises_1 = __importDefault(require("fs/promises"));
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, ".uploads"), // cb -> callback
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    },
});
exports.handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
}).single("image");
class ImagenController {
    static convertirAImagenes(array) {
        //console.log(array.length);
        for (let i = 0; i < array.length; i++) {
            array[i].imagen = buffer_1.Buffer.from(array[i].imagen).toString('base64');
        }
        return array;
    }
    static vaciarCarpeta() {
        return __awaiter(this, void 0, void 0, function* () {
            let dirPath = ".uploads";
            try {
                let files = yield promises_1.default.readdir(dirPath);
                const deleteFilePromises = files.map(file => promises_1.default.unlink(path.join(dirPath, file)));
                yield Promise.all(deleteFilePromises);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static convertirABuffer(img) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(img);
            return fs.readFileSync(img[0].path);
        });
    }
}
exports.ImagenController = ImagenController;
