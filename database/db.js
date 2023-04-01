
const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT } = require('./config.js')

const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : DB_HOST,
    user : DB_USER,
    password : DB_PASSWORD,
    database : DB_DATABASE,
    port: DB_PORT,
})

conexion.connect( (error)=> {
    if(error){
        console.log('El error de conexión es: '+ error)
        return
    }
    console.log('¡Conectado a la base de datos MySQL!')
})

module.exports = conexion