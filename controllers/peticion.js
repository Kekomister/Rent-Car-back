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
exports.PeticionController = void 0;
const imagen_1 = require("./imagen");
const mysql = __importStar(require("mysql2"));
const conection_1 = __importDefault(require("../config/conection"));
class PeticionController {
}
exports.PeticionController = PeticionController;
_a = PeticionController;
PeticionController.getPeticiones = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let peticiones;
        const pool = mysql.createConnection(conection_1.default);
        let query = `SELECT 
            id_peticion, sucursal_retiro, sucursal_devolucion,
            fecha_retiro, fecha_devolucion, codigo_retiro, Peticiones.precio,
            Peticiones.auto_sucursal, usuario, finalizado,
            nombre_usuario, Autos_Sucursales.id_auto, imagen,
            sret.ciudad as ciudad_ret, sdev.ciudad as ciudad_dev
            FROM Peticiones
            JOIN Usuarios ON Usuarios.id_usuario = Peticiones.usuario
            JOIN Autos_Sucursales ON Autos_Sucursales.id_auto_sucursal = Peticiones.auto_sucursal
            JOIN Sucursales sret ON sret.id_sucursal = Peticiones.sucursal_retiro
            JOIN Sucursales sdev ON sdev.id_sucursal = Peticiones.sucursal_devolucion
            Join Autos ON Autos.id_auto = Autos_Sucursales.id_auto`;
        pool.connect(function (err) {
            if (err)
                throw err;
            pool.query(query, function (err, result) {
                if (err)
                    throw err;
                peticiones = result;
                peticiones = imagen_1.ImagenController.convertirAImagenes(peticiones);
                //console.log("Peticiones : ", peticiones);
                pool.end((error) => {
                    if (error) {
                        console.error('Error closing MySQL connection:', error);
                        return;
                    }
                    //consol.log('MySQL connection closed.');
                    res.send(peticiones);
                });
            });
        });
    }
    catch (e) {
        res.send(e);
    }
}));
// id_peticion : int, sucursal_retiro : int, sucursal_devolucion : int
// fecha_retiro : datetime, fecha_devolucion : datetime, codigo_retiro : varchar
// auto : int, usuario : int, finalizado : bit
PeticionController.createPeticion = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = mysql.createConnection(conection_1.default);
        let query = `INSERT INTO Peticiones
                (sucursal_retiro, sucursal_devolucion, fecha_retiro,
                fecha_devolucion, codigo_retiro, precio, auto_sucursal, 
                usuario, finalizado) 
                VALUES 
                (?)`;
        let values = [
            req.body.sucursal_retiro,
            req.body.sucursal_devolucion,
            req.body.fecha_retiro,
            req.body.fecha_devolucion,
            req.body.codigo_retiro,
            req.body.precio,
            req.body.auto_sucursal,
            req.body.usuario,
            req.body.finalizado
        ];
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
// id_peticion : int, sucursal_retiro : int, sucursal_devolucion : int
// fecha_retiro : datetime, fecha_devolucion : datetime, codigo_retiro : varchar
// auto : int, usuario : int, finalizado : bit
PeticionController.updatePeticion = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.body);
        let query = `UPDATE Peticiones SET
                sucursal_devolucion = ?
                WHERE id_peticion = ?`;
        const pool = mysql.createConnection(conection_1.default);
        let values = [
            req.body.sucursal_devolucion,
            req.params.id
        ];
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
PeticionController.finalizarPeticion = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //console.log(req.body);
        let query = `UPDATE Peticiones SET
                finalizado = ?
                WHERE id_peticion = ?`;
        const pool = mysql.createConnection(conection_1.default);
        let values = [
            req.body.finalizado,
            req.params.id
        ];
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
PeticionController.deletePeticion = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = `DELETE FROM Peticiones WHERE id_peticion = ?`;
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
