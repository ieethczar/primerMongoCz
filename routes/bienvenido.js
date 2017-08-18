var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {});

router.post('/', function (req, res, next) {
    var db = req.db;
    var usuarios = db.get('usuarios');

    usuarios.find({
        usuario: req.body.user,
        password: req.body.password
    }).then(function (docs) {
        if (Object.keys(docs).length > 0) {
            res.render('bienvenido', {
                datos: docs
            });
        } else {
            res.render('index', {
                mensaje: "Error!: Usuario no encontrado.",
                validado: false
            });
        }
    });



    /*usuarios.count({
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
    });*/
});
module.exports = router;