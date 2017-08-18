var express = require('express'); 
var router = express.Router(); 

router.get('/', function (req, res, next) {
    res.render('alta');
});

router.post('/',function(req,res,next){
    var db = req.db;
    var usuarios = db.get('usuarios');
    
    usuarios.find({
        usuario: req.body.user
    }).then(function (docs) {
        
        if (Object.keys(docs).length > 0) {
            res.render('alta', {
                mensaje:"Ya existe un usuario con este sobrenombre"
            });
        } else {
            usuarios.insert({
                usuario:req.body.txtUsuarioU,
                password:req.body.txtPasswordU,
                nombre:req.body.txtNombreU
            }).then(function(inse){
                if(Object.keys(inse).length>0){
                    res.render('bienvenido', {
                        datos: docs
                    });
                }else{
                    res.render('alta', {
                        mensaje:"No fue posible registrar el usuario"
                    });
                }
            });
        }
    });
});

module.exports = router;