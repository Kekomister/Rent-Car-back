import { Request, Response } from 'express';

import * as mysql from 'mysql2';
import config from '../config/conection';

export class UsuarioController {

    static getUsuarios = (async (req: Request, res: Response) => {
        try {
            let usuarios: mysql.QueryResult;
            const pool = mysql.createConnection(config);
            var query = `SELECT * FROM Usuarios`;
            pool.connect(function (err) {
                if (err) throw err;
                pool.query(query, function (err, result) {
                    if (err) throw err;
                    usuarios = result;
                    //console.log("Usuarios : ", usuarios);
                    pool.end((error) => {
                        if (error) {
                            console.error('Error closing MySQL connection:', error);
                            return;
                        }
                        //consol.log('MySQL connection closed.');
                        res.send(usuarios);
                    });
                });
            });
        } catch (e) {
            res.send(e);
        }
    });

    // id_usuario : int, nombre : varchar, apellido : varchar
    // dni : int, nombre_usuario : varchar, contrasenia : varchar
    // mail : varchar(max)

    static createUsuario = (async (req: Request, res: Response) => {
        try {
            const pool = mysql.createConnection(config);
            let query =
                `INSERT INTO Usuarios (nombre, apellido, dni, nombre_usuario, contrasenia, mail) 
                VALUES (?)`
            let values = [
                req.body.nombre,
                req.body.apellido,
                req.body.dni,
                req.body.nombre_usuario,
                req.body.contrasenia,
                req.body.mail
            ]
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

    // id_usuario : int, nombre : varchar, apellido : varchar
    // dni : int, nombre_usuario : varchar, contrasenia : varchar
    // mail : varchar(max)

    static updateUsuario = (async (req: Request, res: Response) => {
        try {
            //console.log(req.body);
            const pool = mysql.createConnection(config);
            let query =
                `UPDATE Usuarios SET 
                nombre = ?, 
                apellido = ?,
                nombre_usuario = ?,
                contrasenia = ?,
                mail = ?
                WHERE id_usuario = ?`;
            let values = [
                req.body.nombre,
                req.body.apellido,
                req.body.nombre_usuario,
                req.body.contrasenia,
                req.body.mail,
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

    static deleteUsuario = (async (req: Request, res: Response) => {
        try {
            let query = `DELETE FROM Usuarios WHERE id_usuario = ?`;
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