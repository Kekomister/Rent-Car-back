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
exports.Auto_SucursalController = void 0;
const imagen_1 = require("./imagen");
const mysql = __importStar(require("mysql2"));
const conection_1 = __importDefault(require("../config/conection"));
class Auto_SucursalController {
}
exports.Auto_SucursalController = Auto_SucursalController;
_a = Auto_SucursalController;
Auto_SucursalController.getAuto_Sucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let auto_Sucursales;
        const pool = mysql.createConnection(conection_1.default);
        let query = `SELECT 
            id_auto_sucursal, Autos_Sucursales.id_auto, id_sucursal_actual, 
            nombre, marca, costo, ciudad, imagen
            FROM Autos_Sucursales
            INNER JOIN Autos on Autos.id_auto = Autos_Sucursales.id_auto
            INNER JOIN Sucursales on Sucursales.id_sucursal = Autos_Sucursales.id_sucursal_actual`;
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, function (err, result) {
                if (err)
                    throw err;
                auto_Sucursales = result;
                auto_Sucursales = imagen_1.ImagenController.convertirAImagenes(auto_Sucursales);
                //console.log("Auto_Sucursales : ", auto_Sucursales);
                pool.end((error) => {
                    if (error) {
                        console.error('Error closing MySQL connection:', error);
                        return;
                    }
                    //console.log('MySQL connection closed.');
                    res.send(auto_Sucursales);
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
Auto_SucursalController.buscarAuto_Sucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let auto_Sucursales;
        const pool = mysql.createConnection(conection_1.default);
        let query = `SELECT 
            id_auto_sucursal, Autos_Sucursales.id_auto, id_sucursal_actual, 
            nombre, marca, costo, ciudad, imagen
            FROM Autos_Sucursales
            INNER JOIN Autos on Autos.id_auto = Autos_Sucursales.id_auto
            INNER JOIN Sucursales on Sucursales.id_sucursal = Autos_Sucursales.id_sucursal_actual
			WHERE id_auto_sucursal = ?`;
        let value = req.params.id;
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, value, function (err, result) {
                if (err)
                    throw err;
                auto_Sucursales = result;
                auto_Sucursales = imagen_1.ImagenController.convertirAImagenes(auto_Sucursales);
                //console.log("Auto_Sucursales : ", auto_Sucursales);
                pool.end((error) => {
                    if (error) {
                        console.error('Error closing MySQL connection:', error);
                        return;
                    }
                    //console.log('MySQL connection closed.');
                    res.send(auto_Sucursales);
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
// id_auto_sucursal : int, id_auto : int, id_sucursal_actual : int
Auto_SucursalController.createNewAuto_Sucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = mysql.createConnection(conection_1.default);
        let query = `SELECT * FROM autos
                        ORDER BY id_auto desc 
                        LIMIT 1`;
        let id_auto;
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, function (err, result) {
                if (err)
                    throw err;
                id_auto = result[0].id_auto;
                //console.log(id_auto);
                query = `INSERT INTO Autos_Sucursales 
                    (id_auto, id_sucursal_actual) VALUES (?)`;
                let values = [id_auto, req.body.id_sucursal_actual];
                pool.query(query, [values], function (err, result) {
                    if (err)
                        throw err;
                    pool.end((error) => {
                        if (error) {
                            console.error('Error closing MySQL connection:', error);
                            return;
                        }
                        //console.log('MySQL connection closed.');
                        res.send(result);
                    });
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
Auto_SucursalController.createOldAuto_Sucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = mysql.createConnection(conection_1.default);
        let query = `INSERT INTO Autos_Sucursales 
            (id_auto, id_sucursal_actual) VALUES (?)`;
        let values = [req.params.id, req.body.id_sucursal_actual];
        pool.query(query, [values], function (err, result) {
            if (err)
                throw err;
            pool.end((error) => {
                if (error) {
                    console.error('Error closing MySQL connection:', error);
                    return;
                }
                //console.log('MySQL connection closed.');
                res.send(result);
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
// id_auto_sucursal : int, id_auto : int, id_sucursal_actual : int
// rentado : bit
Auto_SucursalController.updateAuto_Sucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.body);
        let query = `UPDATE Autos_Sucursales SET 
                id_sucursal_actual = ?
                WHERE id_auto_sucursal = ?`;
        const pool = mysql.createConnection(conection_1.default);
        let values = [req.body.id_sucursal_actual, req.params.id];
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, values, function (err, result) {
                if (err)
                    throw err;
                pool.end((error) => {
                    if (error) {
                        console.error('Error closing MySQL connection:', error);
                        return;
                    }
                    //console.log('MySQL connection closed.');
                    res.send(result);
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
// // query?variable=''&variable=
Auto_SucursalController.deleteAuto_Sucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = `DELETE FROM Autos_Sucursales WHERE id_auto_sucursal = ?`;
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
                    //console.log('MySQL connection closed.');
                    res.send(result);
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
