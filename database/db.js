const mysql = require('mysql')

const conexion = mysql.createConnection({
    host : process.env.DB_HOST || 3306,
    user : process.env.DB_USER || 'root',
    password : process.env.DB_PASS || '',
    database : process.env.DB_DATABASE || 'nubes',
    port: process.env.DB_PORT || 3306,
})

conexion.connect( (error)=> {
    if(error){
        console.log('El error de conexión es: '+ error)
        return
    }
    console.log('¡Conectado a la base de datos MySQL!')
})

module.exports = conexion