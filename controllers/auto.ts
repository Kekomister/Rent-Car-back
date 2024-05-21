import { Request, Response } from 'express';
import { ImagenController, handleMultipartData } from './imagen';

import * as mysql from 'mysql2';
import config from '../config/conection';

export class AutoController {

    static getAuto = (async (req: Request, res: Response) => {
        try {
            let autos: mysql.QueryResult;
            const pool = mysql.createConnection(config);
            let query = `SELECT 
            id_auto, nombre, marca, costo, imagen 
            FROM Autos`;
            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, function (err, result) {
                    if (err) throw err;
                    autos = result;
                    //console.log("Autos : ", autos);
                    autos = ImagenController.convertirAImagenes(autos);

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
        } catch (e) {
            res.send(e);
        }
    });

    static getImagen = (async (req: Request, res: Response) => {
        try {
            handleMultipartData(req, res, async (err: { message: any; }) => {
                if (err) {
                    //res.json({ msgs: err.message });
                }
                //console.log(req.files);

                let img = await ImagenController.convertirABuffer(req.files);
                //console.log(img);

                img = ImagenController.convertirAImagenes([{ imagen: img }]);

                ImagenController.vaciarCarpeta();
                res.send(img);
            });
        } catch (e) {
            console.log(e);
        }
    })

    // id_auto : int, nombre : varchar, marca : varchar
    // imagen : varbinary(max), costo : int

    static createAuto = (async (req: Request, res: Response) => {
        let bod = req.body;
        //console.log(req.body);
        try {
            handleMultipartData(req, res, async (err: { message: any; }) => {
                if (err) {
                    //res.json({ msgs: err.message });
                }
                const pool = mysql.createConnection(config);

                //console.log(req.files);

                let img = await ImagenController.convertirABuffer(req.files);

                let query = `INSERT INTO Autos  (nombre, marca, imagen, costo) 
                            VALUES (?)`
                let values = [bod.nombre, bod.marca, img, bod.costo];
                pool.connect(function (err) {

                    if (err) throw err;
                    pool.query(query, [values], function (err, result) {

                        if (err) throw err;

                        ImagenController.vaciarCarpeta();
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
            });
        } catch (e) {
            console.log(e);
        }
    })

    // id_auto : int, nombre : varchar, marca : varchar
    // imagen : varbinary(max), costo : int

    static updateAuto = (async (req: Request, res: Response) => {
        let bod = req.body;

        try {
            handleMultipartData(req, res, async (err: { message: any; }) => {
                if (err) {
                    //res.json({ msgs: err.message });
                    console.log("ERROR : " + err);
                }

                //console.log(bod);

                const pool = mysql.createConnection(config);

                //console.log("FILES : ");
                //console.log(req.files?.length);
                
                let query = "";
                let values = [];
                
                if (req.files?.length == 0) {
                    query =
                        `UPDATE Autos SET costo = ? 
                        WHERE id_auto = ?`;
                    
                    values = [bod.costo, req.params.id];
                } else {
                    query =
                        `UPDATE Autos SET 
                    imagen = ?,
                    costo = ?
                    WHERE id_auto = ?`;

                    let img = await ImagenController.convertirABuffer(req.files);
                    values = [img, bod.costo, req.params.id];
                }
                
                pool.connect(function (err) {
                    if (err) throw err;
                    pool.query(query, values, function (err, result) {
                        if (err) throw err;

                        ImagenController.vaciarCarpeta();
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
            });
        } catch (e) {
            console.log(e);
        }
    })

    // // query?variable=''&variable=

    static deleteAuto = (async (req: Request, res: Response) => {
        try {
            let query = `DELETE FROM Autos WHERE id_auto = ?`;
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