var gulp = require('gulp');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var file = require('gulp-file');
var map = require('map-stream');

/*gulp.task('crea-route',function(){
    gulp.src('./views/*NEW.pug')
        .pipe(concat('*NEW.js'))
        .pipe(gulp.dest('./routes/'));

    gulp.src('./views/*NEW.js')
        .pipe(rename('*NEW.js'))
        .pipe(gulp.dest('./routes/'));

});

gulp.task('paramet',function(){
    console.log(process.argv[4]);
});*/

gulp.task('crear',function(){
    var archivo = process.argv[4];
    var contenidoPug = "extends layout";
    var contenidoJs = "var express = require('express');";

    var appRutas = "var "+archivo+" = require('./routes/"+archivo+"');"
    var appVista = "app.use('/"+archivo+"',"+archivo+");";

    gulp.src('',{nodir:true})
        .pipe(file(archivo+'.pug',contenidoPug))
        .pipe(gulp.dest('./views/'));

    gulp.src('',{nodir:true})
        .pipe(file(archivo+'.js',contenidoJs))
        .pipe(gulp.dest('./routes/'));

    gulp.src('./app.js')
        .pipe(map(function(file,cb){
            var contenidoApp = file.contents.toString();
            contenidoApp = contenidoApp.replace('//hola-rutas',appRutas+'\n//hola-rutas');
            contenidoApp = contenidoApp.replace('//hola-recurso',appVista+'\n//hola-recurso');
            file.contents = new Buffer(contenidoApp);
            cb(null,file);
        }))
        .pipe(gulp.dest('./'));
});
