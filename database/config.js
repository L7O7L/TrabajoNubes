const PORT = process.env.PORT || 3000

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASS || ''
const DB_DATABASE = process.env.DB_DATABASE || 'nubes'
const DB_PORT = process.env.DB_PORT || 3306

module.exports = {

    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    DB_PORT,
    PORT

}