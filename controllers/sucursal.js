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
exports.SucursalController = void 0;
const mysql = __importStar(require("mysql2"));
const conection_1 = __importDefault(require("../config/conection"));
class SucursalController {
}
exports.SucursalController = SucursalController;
_a = SucursalController;
SucursalController.getSucursales = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sucursales;
        const pool = mysql.createConnection(conection_1.default);
        var query = `SELECT id_sucursal, ciudad, duenio,
            nombre_usuario, nombre, apellido, mail
            FROM Sucursales
            INNER JOIN Usuarios on Usuarios.id_usuario = Sucursales.duenio`;
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, function (err, result) {
                if (err)
                    throw err;
                sucursales = result;
                //console.log("Sucursales : ", sucursales);
                pool.end((error) => {
                    if (error) {
                        console.error('Error closing MySQL connection:', error);
                        return;
                    }
                    //consol.log('MySQL connection closed.');
                    res.send(sucursales);
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
SucursalController.buscarSucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sucursales;
        const pool = mysql.createConnection(conection_1.default);
        let query = `SELECT id_sucursal, ciudad, duenio,
            nombre_usuario, mail
            FROM Sucursales
            INNER JOIN Usuarios on Usuarios.id_usuario = Sucursales.duenio
            WHERE id_sucursal = ?`;
        let id = req.params.id;
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, id, function (err, result) {
                if (err)
                    throw err;
                sucursales = result;
                //console.log("Sucursales : ", sucursales);
                pool.end((error) => {
                    if (error) {
                        console.error('Error closing MySQL connection:', error);
                        return;
                    }
                    //consol.log('MySQL connection closed.');
                    res.send(sucursales);
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
// id_sucursal : int, ciudad : varchar, duenio : int
SucursalController.createSucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = mysql.createConnection(conection_1.default);
        let query = `INSERT INTO Sucursales (ciudad, duenio) VALUES (?)`;
        let values = [req.body.ciudad, req.body.duenio];
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, [values], function (err, result) {
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
// id_sucursal : int, ciudad : varchar, duenio : int
SucursalController.updateSucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.body);
        let query = `UPDATE Sucursales SET duenio = ? WHERE id_sucursal = ?`;
        let values = [req.body.id_usuario, req.params.id];
        const pool = mysql.createConnection(conection_1.default);
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
// // query?variable=''&variable=
SucursalController.deleteSucursal = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = `DELETE FROM Sucursales WHERE id_sucursal = ?`;
        let value = req.params.id;
        const pool = mysql.createConnection(conection_1.default);
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
