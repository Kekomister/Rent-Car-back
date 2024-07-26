import { Request, Response } from 'express';
import { ImagenController } from './imagen';

import * as mysql from 'mysql2';
import config from '../config/conection';

export class PeticionController {

    static getPeticiones = (async (req: Request, res: Response) => {
        try {
            let peticiones: mysql.QueryResult;
            const pool = mysql.createConnection(config);
            let query = `SELECT 
            id_peticion, sucursal_retiro, sucursal_devolucion,
            fecha_retiro, fecha_devolucion, codigo_retiro, peticiones.precio,
            peticiones.auto_sucursal, usuario, finalizado,
            nombre_usuario, autos_sucursales.id_auto, imagen,
            sret.ciudad as ciudad_ret, sdev.ciudad as ciudad_dev
            FROM peticiones
            JOIN usuarios ON usuarios.id_usuario = peticiones.usuario
            JOIN autos_sucursales ON autos_sucursales.id_auto_sucursal = peticiones.auto_sucursal
            JOIN sucursales sret ON sret.id_sucursal = peticiones.sucursal_retiro
            JOIN sucursales sdev ON sdev.id_sucursal = peticiones.sucursal_devolucion
            Join autos ON autos.id_auto = autos_sucursales.id_auto`;

            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, function (err, result) {
                    if (err) throw err;

                    peticiones = result;
                    peticiones = ImagenController.convertirAImagenes(peticiones);
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
        } catch (e) {
            res.send(e);
        }
    });

    // id_peticion : int, sucursal_retiro : int, sucursal_devolucion : int
    // fecha_retiro : datetime, fecha_devolucion : datetime, codigo_retiro : varchar
    // auto : int, usuario : int, finalizado : bit

    static createPeticion = (async (req: Request, res: Response) => {
        try {
            const pool = mysql.createConnection(config);
            let query =
                `INSERT INTO peticiones
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
                if (err) throw err;
                pool.query(query, [values], function (err, result) {
                    if (err) throw err;
                    
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
        } catch (e) {
            res.send(e);
        }
    })

    // id_peticion : int, sucursal_retiro : int, sucursal_devolucion : int
    // fecha_retiro : datetime, fecha_devolucion : datetime, codigo_retiro : varchar
    // auto : int, usuario : int, finalizado : bit

    static updatePeticion = (async (req: Request, res: Response) => {
        try {
            //console.log(req.body);
            let query =
                `UPDATE peticiones SET
                sucursal_devolucion = ?
                WHERE id_peticion = ?`;
            const pool = mysql.createConnection(config);
            let values = [
                req.body.sucursal_devolucion,
                req.params.id
            ]

            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, values, function (err, result) {
                    if (err) throw err;
                   
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
        } catch (e) {
            res.send(e);
        }
    })

    static finalizarPeticion = (async (req: Request, res: Response) => {
        try {
            //console.log(req.body);
            let query =
                `UPDATE peticiones SET
                finalizado = ?
                WHERE id_peticion = ?`;
            const pool = mysql.createConnection(config);
            let values = [
                req.body.finalizado,
                req.params.id
            ]

            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, values, function (err, result) {
                    if (err) throw err;
                   
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
        } catch (e) {
            res.send(e);
        }
    })

    // // query?variable=''&variable=

    static deletePeticion = (async (req: Request, res: Response) => {
        try {
            let query = `DELETE FROM peticiones WHERE id_peticion = ?`;
            const pool = mysql.createConnection(config);
            let value = req.params.id;

            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, value, function (err, result) {
                    if (err) throw err;

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
        } catch (e) {
            res.send(e);
        }
    })

}