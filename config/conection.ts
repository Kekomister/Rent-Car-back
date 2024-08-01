
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


const config = {
  host: "sql10.freesqldatabase.com",
  user: "sql10723479",
  password: "rqJuVFmItR",
  database: 'sql10723479',
  port: 3306
}

export default config;