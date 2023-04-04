const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

const productsController = require('../controllers/productsController')
const conexion = require('../database/db')

//router para las vistas
router.get('/', authController.isAuthenticated, (req, res)=>{    
    conexion.query('SELECT * FROM productos',(error, results)=>{
        if(error){
            throw error;
        } else {                       
            res.render('index', {results:results})
      
        }   
    })
})
router.get('/login', (req, res)=>{
    res.render('login', {alert: 0})
})
router.get('/register', (req, res)=>{
    res.render('register')
})

router.get('/create', (req,res)=>{
    res.render('create');
})

router.get('/edit/:id', (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM productos WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit.ejs', {producto:results[0]});            
        }        
    });
});

router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM productos WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
    })
});


//router para los métodos del controller
router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/logout', authController.logout)

router.post('/save', productsController.save);
router.post('/update', productsController.update);

module.exports = router