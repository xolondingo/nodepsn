// Definiciones
const { ESTALE } = require('constants');
const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./keys');

const pool = mysql.createPool(database);

// Inicializaciones

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('LA CONEXION A LA BASE DE DATOS SE HA CERRADO');
        }
        if (err.code === 'ER_CON_COUNT_ERROR'){
            console.error('LA BASE DE DATOS TIENE DEMASIADAS CONEXIONES');
        }
        if (err.code === 'ECONNREFUSED'){
            console.error('CONEXION A LA BASE DE DATOS FUE RECHAZADA');
        }
        if (err.code === 'ETIMEDOUT'){
            console.error('TIEMPO DE CONEXION EXCEDIDO A LA BASE DE DATOS');
        }
        if (err.code === 'ER_ACCESS_DENIED_ERROR'){
            console.error('ACCESO DENEGADO A LA BASES DE DATOS REVISE USUARIO Y CONTRASEÑA');
        }
        if (err.code === 'ER_BAD_DB_ERROR'){
            console.error('BASE DE DATOS INCORRECTA, VERIFIQUE QUE EL ACCESO A LA BASE SEA EL ADECUADO');
        }
        
        // se agreag esta linea para los demás códigos de error que no están en los if de arriba
        console.error('error: ' +err.message );
    } 

    // se  modificó agregó esta validación ya que connection siempre es true, pero en caso de error es undefined
   if (connection === undefined) {
        console.log('BASE DE DATOS NO CONECTADA');
        process.exit(1);
    } else {
        connection.release();
        console.log('BASE DE DATOS CONECTADA');
   }
        
    return;

});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
