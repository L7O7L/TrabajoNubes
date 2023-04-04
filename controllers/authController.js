const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const { promisify } = require('util')

//procedimiento para registrarnos
exports.register = async (req, res) => {
    try {
        const nombre = req.body.nombre
        const apellidos = req.body.apellidos
        const email = req.body.email
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 8)
        //console.log(passHash)   
        conexion.query('INSERT INTO usuarios SET ?', { nombre: nombre, apellidos: apellidos, email: email, password: passHash }, (error, results) => {
            if (error) { console.log(error) }
            res.redirect('/')
        })
    } catch (error) {
        console.log(error)
    }
}

exports.login = async (req, res) => {
    try {
        const email = req.body.email
        const pass = req.body.pass

        if (!email || !pass) {

        } else {

            conexion.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results) => {

                if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].password))) {

                    res.render('login', {
                        alert: 1,
                        alertTitle: "Error",
                        alertMessage: "Usuario y/o Password incorrectas",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                    })

                } else {

                    const id = results[0].id
                    const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })

                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }

                    res.cookie('jwt', token, cookiesOptions)

                    res.render('login', {
                        alert: 3,
                        alertTitle: "Conexión exitosa",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 800,
                        ruta: ''
                    })

                }
            })

        }
    } catch (error) {
        console.log(error)
    }

}


exports.isAuthenticated = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
            conexion.query('SELECT * FROM usuarios WHERE id = ?', [decodificada.id], (error, results) => {
                if (!results) { return next() }
                req.email = results[0]
                return next()
            })
        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        res.redirect('/login')
    }
}

exports.logout = (req, res) => {

    res.clearCookie('jwt')
    return res.redirect('/')
}