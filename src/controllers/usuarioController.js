const controller = {};
const bcryptjs = require('bcryptjs');  //Contraseñas encriptadas

controller.index = (req, res) => {
    var novedades = []

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros ORDER BY id DESC LIMIT 6', (err, seccion1) => {
            novedades = seccion1
        });
    });

    req.getConnection((err, conn) => {
        conn.query('SELECT l.nombre, l.autor, l.isbn, l.precio, l.imagen, SUM(v.cantidad) AS libros_vendidos FROM ventas AS v JOIN libros AS l WHERE v.id_libro = l.id GROUP BY id_libro ORDER BY libros_vendidos DESC', (err, libros) => {
                res.render('index', {
                    novedades: novedades,
                    mas_vendidos: libros
                });
        });
    });
}

controller.search = (req, res) => {
    const data = req.body;
    const buscar = req.body.search_book;

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
var categoria = [];
var autor = [];

controller.details = (req, res) => {
    const isbn = req.params.isbn;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE isbn = ?', [isbn], (err, libro) => {
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
    res.render('acceder', {
        alert: true,
        alertTitle: "Debes tener una cuenta para comprar en BookLand",
        alertMessage: "Crea una cuenta y disfruta de los beneficios.",
        alertIcon: 'warning',
        showConfirmButton: true,
        timer: false,
        ruta: '/acceder'
    });
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

    if (nombre && apellido_paterno && apellido_materno && correo && password) {
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
    } else {
        res.render('acceder', {
            alert: true,
            alertTitle: "Campos Vacíos",
            alertMessage: "Debes de llenar todos los campos para tu registro.",
            alertIcon: 'warning',
            showConfirmButton: true,
            timer: false,
            ruta: '/acceder'
        });
    }
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
                        ruta: '/acceder'
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
            ruta: '/acceder'
        });
    }
}

controller.record = (req, res) => {
    req.getConnection((err, conn) => {
       conn.query('SELECT v.id, u.nombre AS nombre_usuario, u.apellido_paterno, u.apellido_materno, l.nombre, l.autor, l.isbn, l.editorial, l.precio, v.cantidad, v.total_se, v.total_ce, v.tipo_envio, v.tipo_pago, v.estatus FROM libros AS l JOIN ventas AS v ON l.id = v.id_libro JOIN usuarios AS u ON v.id_usuario = u.id', (err, historial) => {
           res.render('historial_ventas', {
             data: historial
          });
       });
    });
}

controller.filter_search = (req, res) => {
    const data = req.body;

    //filtrar_search hace referencia al nombre del input
    req.getConnection((err, conn) => {
        conn.query('SELECT v.id, u.nombre AS nombre_usuario, u.apellido_paterno, u.apellido_materno, l.nombre, l.autor, l.isbn, l.editorial, l.precio, v.cantidad, v.total_se, v.total_ce, v.tipo_envio, v.tipo_pago, v.estatus FROM libros AS l JOIN ventas AS v ON l.id = v.id_libro JOIN usuarios AS u ON v.id_usuario = u.id WHERE v.id_usuario = ?', [data.filtrar_search], (err, libros) => {
            res.render('historial_ventas', {
                data: libros
            });
        });
    });
}

controller.filter_desc = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT v.id, u.nombre AS nombre_usuario, u.apellido_paterno, u.apellido_materno, l.nombre, l.autor, l.isbn, l.editorial, l.precio, v.cantidad, l.precio * v.cantidad AS total_a_pagar, v.tipo_envio, v.tipo_pago, v.estatus FROM libros AS l JOIN ventas AS v ON l.id = v.id_libro JOIN usuarios AS u ON v.id_usuario = u.id ORDER BY cantidad DESC', (err, libros) => {
            res.render('historial_ventas', {
                data: libros
            });
        });
    });
};

controller.tracing = (req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('SELECT v.id, l.imagen, l.nombre, l.autor, l.isbn, l.editorial, l.precio, v.cantidad, v.tipo_envio, v.tipo_pago, v.estatus FROM ventas AS v JOIN libros AS l ON v.id_libro = l.id WHERE v.id = ?', [id], (err, seguimiento) => {
            res.render('seguimiento', {
                data: seguimiento
            });
        });
    });
}

controller.update_tracing = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const estatus = req.body.estatus;

    console.log(data);
    console.log(id);
    console.log(estatus);

    req.getConnection((err, conn) => {
        conn.query('UPDATE ventas SET estatus = ? WHERE id = ?', [estatus, id], (err, seguimiento) => {
            console.log(seguimiento);
            res.redirect('/historial');
        });
    });
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

function SugerenciaCategoria(libros_categoria) {
    categoria = libros_categoria;
}

function SugerenciaAutor(libros_autor) {
    autor = libros_autor;
}

module.exports = controller;