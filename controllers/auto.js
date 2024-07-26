"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoController = void 0;
const imagen_1 = require("./imagen");
const mysql = __importStar(require("mysql2"));
const conection_1 = __importDefault(require("../config/conection"));
class AutoController {
}
exports.AutoController = AutoController;
_a = AutoController;
AutoController.getAuto = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let autos;
        const pool = mysql.createConnection(conection_1.default);
        let query = `SELECT 
            id_auto, nombre, marca, costo, imagen 
            FROM Autos`;
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, function (err, result) {
                if (err)
                    throw err;
                autos = result;
                //console.log("Autos : ", autos);
                autos = imagen_1.ImagenController.convertirAImagenes(autos);
                pool.end((error) => {
                    if (error) {
                        console.error('Error closing MySQL connection:', error);
                        return;
                    }
                    //consol.log('MySQL connection closed.');
                    res.send(autos);
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
AutoController.getImagen = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, imagen_1.handleMultipartData)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                //res.json({ msgs: err.message });
            }
            //console.log(req.files);
            let img = yield imagen_1.ImagenController.convertirABuffer(req.files);
            //console.log(img);
            img = imagen_1.ImagenController.convertirAImagenes([{ imagen: img }]);
            imagen_1.ImagenController.vaciarCarpeta();
            res.send(img);
        }));
    }
    catch (e) {
        console.log(e);
    }
}));
// id_auto : int, nombre : varchar, marca : varchar
// imagen : varbinary(max), costo : int
AutoController.createAuto = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bod = req.body;
    //console.log(req.body);
    try {
        (0, imagen_1.handleMultipartData)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                //res.json({ msgs: err.message });
            }
            const pool = mysql.createConnection(conection_1.default);
            //console.log(req.files);
            let img = yield imagen_1.ImagenController.convertirABuffer(req.files);
            let query = `INSERT INTO Autos  (nombre, marca, imagen, costo) 
                            VALUES (?)`;
            let values = [bod.nombre, bod.marca, img, bod.costo];
            pool.connect(function (err) {
                if (err)
                    throw err;
                pool.query(query, [values], function (err, result) {
                    if (err)
                        throw err;
                    imagen_1.ImagenController.vaciarCarpeta();
                    pool.end((error) => {
                        if (error) {
                            console.error('Error closing MySQL connection:', error);
                            return;
                        }
                        //consol.log('MySQL connection closed.');
                        res.send(result);
                    });
                });
            });
        }));
    }
    catch (e) {
        console.log(e);
    }
}));
// id_auto : int, nombre : varchar, marca : varchar
// imagen : varbinary(max), costo : int
AutoController.updateAuto = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let bod = req.body;
    try {
        (0, imagen_1.handleMultipartData)(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            if (err) {
                //res.json({ msgs: err.message });
                console.log("ERROR : " + err);
            }
            //console.log(bod);
            const pool = mysql.createConnection(conection_1.default);
            //console.log("FILES : ");
            //console.log(req.files?.length);
            let query = "";
            let values = [];
            if (((_b = req.files) === null || _b === void 0 ? void 0 : _b.length) == 0) {
                query =
                    `UPDATE Autos SET costo = ? 
                        WHERE id_auto = ?`;
                values = [bod.costo, req.params.id];
            }
            else {
                query =
                    `UPDATE Autos SET 
                    imagen = ?,
                    costo = ?
                    WHERE id_auto = ?`;
                let img = yield imagen_1.ImagenController.convertirABuffer(req.files);
                values = [img, bod.costo, req.params.id];
            }
            pool.connect(function (err) {
                if (err)
                    throw err;
                pool.query(query, values, function (err, result) {
                    if (err)
                        throw err;
                    imagen_1.ImagenController.vaciarCarpeta();
                    pool.end((error) => {
                        if (error) {
                            console.error('Error closing MySQL connection:', error);
                            return;
                        }
                        //consol.log('MySQL connection closed.');
                        res.send(result);
                    });
                });
            });
        }));
    }
    catch (e) {
        console.log(e);
    }
}));
// // query?variable=''&variable=
AutoController.deleteAuto = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = `DELETE FROM Autos WHERE id_auto = ?`;
        const pool = mysql.createConnection(conection_1.default);
        let value = req.params.id;
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, value, function (err, result) {
                if (err)
                    throw err;
                pool.end((error) => {
                    if (error) {
                        console.error('Error closing MySQL connection:', error);
                        return;
                    }
                    //consol.log('MySQL connection closed.');
                    res.send(result);
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
