//Modulos
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const mysqlconn = require('express-myconnection');

const app = express();

//Importar rutas
const libros = require('./routes/libros');
const usuarios = require('./routes/usuarios');
const usuario_logueado = require('./routes/usuario_logueado');
const {urlencoded} = require("express");
const multer = require("multer");

//Configuración de imágenes
const imgstorage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),  //Destino
    filename: (req, file, cb) => {                        //Nombre de archivo
        cb(null, file.originalname);
    }
});

//Configuraciones
app.set('port', process.env.PORT || 3000);  //El programa correrá sobre el púerto 3000
app.set('view engine', 'ejs');  //ejs como motor de plantillas
app.set('views', path.join(__dirname, 'views'));  //Se indica en que carpeta se encuenrtran las view para cuando se quiera hacer referencia a ellas

//Middlewares
app.use(mysqlconn(mysql, {  //MySQL
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'libreria'
}, 'single'));

app.use(express.urlencoded({  //El servidor se encargará de entender todos los datos que vengan de un formulario si estos son datos básicos (no imágenes o archivos)
    extended: false
}));

app.use(multer({  //Subir imágenes al servidor local
    storage: imgstorage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 5000000},
    fileFilter: (req, file, cb) => {
        const filetypes = /jpg|jpeg|png|gif/;  //Solo aceptará esos formatos
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname) {
            return cb(null, true);
        }
    }
}).single('image'));

//Rutas
app.use('/', usuarios);
app.use('/libros', libros);
app.use('/usuario', usuario_logueado);

//Archivos estáticos ()
app.use(express.static(path.join(__dirname, 'public')));

//Arrancado el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto 3000');
});