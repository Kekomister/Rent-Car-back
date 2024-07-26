"use strict";
// CONFIGURACION PARA SQL SERVER
// const config = {
//     user: 'admin',
//     password: 'rentadmin',
//     // DESKTOP-EHIVGLA\SQLEXPRESS
//     //server: 'localhost',
//     server: 'DESKTOP-EHIVGLA\\SQLEXPRESS',
//     driver: 'msnodesqlv8',
//     //server : '192.168.100.93',
//     // TENES QUE ESPECIFICARLE LA BASE DE DATOS A LA QUE SE LE ASIGNO EN
//     // SQL SERVER -> LOGIN -> USER MAPPING
//     // Y EL NIVEL DE PERMISO
//     database: 'rentCars',
//     options: {
//         // PARA CONECTARSE DIRECTAMENTE CON WINDOWS
//         //trustedConnection : true,
//         encrypt: false, // Deshabilitar el uso de SSL
//     },
//   };
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    host: "localhost",
    user: "rentcars",
    password: "",
    database: 'rentcars',
    port: 3307
};
exports.default = config;
