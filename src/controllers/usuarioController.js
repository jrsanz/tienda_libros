const controller = {};
const bcryptjs = require('bcryptjs');  //Contraseñas encriptadas

controller.index = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros ORDER BY id DESC LIMIT 6', (err, libros) => {
            res.render('index', {
                data: libros
            });
        });
    });
}

controller.search = (req, res) => {
    const data = req.body;
    const buscar = req.body.search_book;

    console.log(data);

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE nombre LIKE "%"?"%" OR autor LIKE "%"?"%" OR isbn LIKE "%"?"%" OR editorial LIKE "%"?"%"', [data.search_book, data.search_book, data.search_book, data.search_book], (err, libros) => {
            if (libros.length == 0 || buscar == ''){
                res.render('libros_search', {
                    data: null
                });
            } else {
                res.render('libros_search', {
                    data: libros
                });
            }
        });
    });
}

//Recuperar Datos Para Sugerir Libros
var recuperar_categoria;
var recuperar_autor;
var categoria = [];
var autor = [];

controller.details = (req, res) => {
    const isbn = req.params.isbn;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE isbn = ?', [isbn], (err, libro) => {
            RecuperarDatos(libro);
            Categoria(req, res, isbn);
            Autor(req, res, isbn);
            res.render('libro_specific', {
                libro_actual: libro,
                categoria_sug: categoria,
                autor_sug: autor
            });
        });
    });
}

controller.buy = (req, res) => {
    const id_libro = req.body.libro;
    const cantidad = req.body.cantidad;
    const tipo_envio = req.body.tipo_envio;
    const tipo_pago = req.body.tipo_pago;

    console.log(id_libro);
    console.log(cantidad);
    console.log(tipo_envio);
    console.log(tipo_pago);

    res.redirect('/');

    /*var data = {
        id_libro: id_libro,
        id_usuario: '',
        cantidad: cantidad,
        tipo_envio: tipo_envio,
        tipo_pago: tipo_pago
    }

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO ventas SET ?', data, (err, conn) => {
            res.redirect('/usuario/');
        });
    });*/
}

controller.myaccount = (req, res) => {
    res.render('acceder');
}

controller.save = async (req, res) => {
    const nombre = req.body.nombre;
    const apellido_paterno = req.body.apellido_paterno;
    const apellido_materno = req.body.apellido_materno;
    const correo = req.body.correo;
    const password = req.body.password;
    let passwordHash = await bcryptjs.hash(password, 8);  //Hash con un ciclo de 8 iteraciones para encriptar la contraseña

    var data = {
        nombre: nombre,
        apellido_paterno: apellido_paterno,
        apellido_materno: apellido_materno,
        correo: correo,
        password: passwordHash
    }

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO usuarios SET ?', data, async (err, usuario) => {
            if(err) {
                console.log(err);
            } else {
                res.render('acceder', {
                   alert: true,
                   alertTitle: "Registro",
                   alertMessage: "¡Registro Exitoso!",
                   alertIcon: 'success',
                   showConfirmButton: false,
                   timer: 1500,
                   ruta: '/'
                });
            }
        });
    });
}


controller.validation = async (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    let passwordHash = await bcryptjs.hash(password, 8);  //Hash con un ciclo de 8 iteraciones para desencriptar la contraseña

    //Validación de usuario y contraseña
    if (correo && password) {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, usuario) => {
                if (usuario.length == 0 || !(await bcryptjs.compare(password, usuario[0].password))) {  //Correo no encontrado || Password incorrecta
                    res.render('acceder', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "Credenciales Incorrectas",
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: '/miCuenta'
                    });
                } else {
                    res.render('acceder', {
                        alert: true,
                        alertTitle: "¡Bienvenido!",
                        alertMessage: "¡LOGIN CORRECTO!",
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: '/usuario/' + usuario[0].id
                    });
                }
            });
        });
    } else {
        res.render('acceder', {
            alert: true,
            alertTitle: "Campos Vacíos",
            alertMessage: "Debes escribir un correo y una contraseña",
            alertIcon: 'warning',
            showConfirmButton: true,
            timer: false,
            ruta: '/miCuenta'
        });
    }
}

function Categoria(req, res, isbn) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE isbn != ? AND categoria IN (SELECT categoria FROM libros WHERE isbn = ?)', [isbn, isbn], (err, libros_categoria) => {
            SugerenciaCategoria(libros_categoria);
        });
    });
}

function Autor(req, res, isbn) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE isbn != ? AND autor IN (SELECT autor FROM libros WHERE isbn = ?)', [isbn, isbn], (err, libros_autor) => {
            SugerenciaAutor(libros_autor);
        });
    });
}

function RecuperarDatos(libro) {
    recuperar_categoria = libro[0].categoria;
    recuperar_autor = libro[0].autor;
}

function SugerenciaCategoria(libros_categoria) {
    categoria = libros_categoria;
}

function SugerenciaAutor(libros_autor) {
    autor = libros_autor;
}

module.exports = controller;