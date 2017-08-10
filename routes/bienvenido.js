var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/bienvenido', function(req, res, next) {
    var db=req.db;
    var usuarios=db.get('usuarios');
    usuarios.find({usuario:req.user,password:req.password},'-_id',function(e,docs){        
        if(docs.length>0){
            res.render('bienvenido')
        }else{
            res.render('index')
        }
    }),function(){
        console.log(e)
    }
})
module.exports = router;
