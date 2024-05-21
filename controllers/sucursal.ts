import { Request, Response } from 'express';

import * as mysql from 'mysql2';
import config from '../config/conection';

export class SucursalController {

    static getSucursales = (async (req: Request, res: Response) => {
        try {
            let sucursales: mysql.QueryResult;
            const pool = mysql.createConnection(config);
            var query = `SELECT id_sucursal, ciudad, duenio,
            nombre_usuario, nombre, apellido, mail
            FROM Sucursales
            INNER JOIN Usuarios on Usuarios.id_usuario = Sucursales.duenio`;
            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, function (err, result) {
                    if (err) throw err;
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
        } catch (e) {
            res.send(e);
        }
    });

    static buscarSucursal = (async (req: Request, res: Response) => {
        try {
            let sucursales: mysql.QueryResult;
            const pool = mysql.createConnection(config);
            let query = `SELECT id_sucursal, ciudad, duenio,
            nombre_usuario, mail
            FROM Sucursales
            INNER JOIN Usuarios on Usuarios.id_usuario = Sucursales.duenio
            WHERE id_sucursal = ?`
            let id = req.params.id;
            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, id, function (err, result) {
                    if (err) throw err;
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
        } catch (e) {
            res.send(e);
        }
    });

    // id_sucursal : int, ciudad : varchar, duenio : int

    static createSucursal = (async (req: Request, res: Response) => {
        try {
            const pool = mysql.createConnection(config);
            let query =
                `INSERT INTO Sucursales (ciudad, duenio) VALUES (?)`;
            let values = [req.body.ciudad, req.body.duenio];
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

    // id_sucursal : int, ciudad : varchar, duenio : int

    static updateSucursal = (async (req: Request, res: Response) => {
        try {
            //console.log(req.body);
            let query =
                `UPDATE Sucursales SET duenio = ? WHERE id_sucursal = ?`;
            let values = [req.body.id_usuario, req.params.id]
            const pool = mysql.createConnection(config);
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

    static deleteSucursal = (async (req: Request, res: Response) => {
        try {
            let query = `DELETE FROM Sucursales WHERE id_sucursal = ?`;
            let value = req.params.id;
            const pool = mysql.createConnection(config);
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