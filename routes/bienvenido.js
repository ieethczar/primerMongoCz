var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
    var db = req.db;
    var usuarios = db.get('usuarios');
    usuarios.count({
        usuario: req.body.user,
        password: req.body.password
    }).then(function (cuenta) {
        if (cuenta > 0) {
            res.render('bienvenido');
        }else{
            res.render('index',{
                mensaje:"Error!: Usuario no encontrado"
            });
        }
        db.close();
    });
}); 
module.exports = router;
