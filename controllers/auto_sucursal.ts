import { Request, Response } from 'express';
import { ImagenController } from './imagen';

import * as mysql from 'mysql2';
import config from '../config/conection';

export class Auto_SucursalController {

    static getAuto_Sucursal = (async (req: Request, res: Response) => {
        try {
            let auto_Sucursales: mysql.QueryResult;
            const pool = mysql.createConnection(config);
            let query = `SELECT 
            id_auto_sucursal, Autos_Sucursales.id_auto, id_sucursal_actual, 
            nombre, marca, costo, ciudad, imagen
            FROM Autos_Sucursales
            INNER JOIN Autos on Autos.id_auto = Autos_Sucursales.id_auto
            INNER JOIN Sucursales on Sucursales.id_sucursal = Autos_Sucursales.id_sucursal_actual`;
            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, function (err, result) {
                    if (err) throw err;

                    auto_Sucursales = result;
                    auto_Sucursales = ImagenController.convertirAImagenes(auto_Sucursales);
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
        } catch (e) {
            res.send(e);
        }
    });

    static buscarAuto_Sucursal = (async (req: Request, res: Response) => {
        try {
            let auto_Sucursales: mysql.QueryResult;
            const pool = mysql.createConnection(config);
            let query = `SELECT 
            id_auto_sucursal, Autos_Sucursales.id_auto, id_sucursal_actual, 
            nombre, marca, costo, ciudad, imagen
            FROM Autos_Sucursales
            INNER JOIN Autos on Autos.id_auto = Autos_Sucursales.id_auto
            INNER JOIN Sucursales on Sucursales.id_sucursal = Autos_Sucursales.id_sucursal_actual
			WHERE id_auto_sucursal = ?`;
            let value = req.params.id;

            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, value, function (err, result) {
                    if (err) throw err;

                    auto_Sucursales = result;
                    auto_Sucursales = ImagenController.convertirAImagenes(auto_Sucursales);
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

        } catch (e) {
            res.send(e);
        }
    });

    // id_auto_sucursal : int, id_auto : int, id_sucursal_actual : int

    static createNewAuto_Sucursal = (async (req: Request, res: Response) => {
        try {
            const pool = mysql.createConnection(config);

            let query = `SELECT * FROM autos
                        ORDER BY id_auto desc 
                        LIMIT 1`;

            let id_auto;
            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, function (err, result: any) {
                    if (err) throw err;

                    id_auto = result[0].id_auto;
                    //console.log(id_auto);

                    query = `INSERT INTO Autos_Sucursales 
                    (id_auto, id_sucursal_actual) VALUES (?)`
                    let values = [id_auto, req.body.id_sucursal_actual];

                    pool.query(query, [values], function (err, result) {
                        if (err) throw err;

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

        } catch (e) {
            res.send(e);
        }
    })

    static createOldAuto_Sucursal = (async (req: Request, res: Response) => {
        try {
            const pool = mysql.createConnection(config);

            let query = `INSERT INTO Autos_Sucursales 
            (id_auto, id_sucursal_actual) VALUES (?)`
            let values = [req.params.id, req.body.id_sucursal_actual];

            pool.query(query, [values], function (err, result) {
                if (err) throw err;

                pool.end((error) => {
                    if (error) {
                        console.error('Error closing MySQL connection:', error);
                        return;
                    }
                    //console.log('MySQL connection closed.');
                    res.send(result);
                });
            });

        } catch (e) {
            res.send(e);
        }
    })

    // id_auto_sucursal : int, id_auto : int, id_sucursal_actual : int
    // rentado : bit

    static updateAuto_Sucursal = (async (req: Request, res: Response) => {
        try {
            //console.log(req.body);
            let query =
                `UPDATE Autos_Sucursales SET 
                id_sucursal_actual = ?
                WHERE id_auto_sucursal = ?`;
            const pool = mysql.createConnection(config);
            let values = [req.body.id_sucursal_actual, req.params.id]

            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, values, function (err, result) {
                    if (err) throw err;

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
        } catch (e) {
            res.send(e);
        }
    })

    // // query?variable=''&variable=

    static deleteAuto_Sucursal = (async (req: Request, res: Response) => {
        try {
            let query = `DELETE FROM Autos_Sucursales WHERE id_auto_sucursal = ?`;
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
                        //console.log('MySQL connection closed.');
                        res.send(result);
                    });
                });
            });
        } catch (e) {
            res.send(e);
        }
    })

}