const conexion = require("../database/db");

exports.save = (req, res) => {
    const nombre = req.body.nombre;
    const categoria = req.body.categoria;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;

    conexion.query('INSERT INTO productos SET ?', { nombre: nombre, categoria: categoria, cantidad: cantidad , precio: precio }, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(results);   
            res.redirect('/');
        }
    });
};
//ACTUALIZAR un REGISTRO
exports.update = (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const categoria = req.body.categoria;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    conexion.query('UPDATE productos SET ? WHERE id = ?', [{ nombre: nombre, categoria: categoria, cantidad: cantidad, precio: precio }, id], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/');
        }
    });
};