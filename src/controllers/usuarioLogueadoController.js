const controller = {};

controller.index_ul = (req, res) => {
    const id = req.params.id;
    var novedades = []

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros ORDER BY id DESC LIMIT 6', (err, seccion1) => {
            novedades = seccion1;
        });
    });
    req.getConnection((err, conn) => {
        conn.query('SELECT l.nombre, l.autor, l.isbn, l.precio, l.imagen, SUM(v.cantidad) AS libros_vendidos FROM ventas AS v JOIN libros AS l WHERE v.id_libro = l.id GROUP BY id_libro ORDER BY libros_vendidos DESC', (err, libros) => {
            res.render('./usuario_logueado/index_ulog', {
                id_sesion: id,
                novedades: novedades,
                mas_vendidos: libros
            });
        });
    });
}

controller.search_ul = (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const buscar = req.body.search_book;

    console.log(data);

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE nombre LIKE "%"?"%" OR autor LIKE "%"?"%" OR isbn LIKE "%"?"%" OR editorial LIKE "%"?"%"', [data.search_book, data.search_book, data.search_book, data.search_book], (err, libros) => {
            if (libros.length == 0 || buscar == ''){
                res.render('./usuario_logueado/libros_search_ulog', {
                    id_sesion: id,
                    data: null
                });
            } else {
                res.render('./usuario_logueado/libros_search_ulog', {
                    id_sesion: id,
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

controller.details_ul = (req, res) => {
    const id = req.params.id;
    const isbn = req.params.isbn;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE isbn = ?', [isbn], (err, libro) => {
            RecuperarDatos(libro);
            Categoria(req, res, isbn);
            Autor(req, res, isbn);

            console.log(libro, categoria, autor);

            res.render('./usuario_logueado/libro_specific_ulog', {
                id_sesion: id,
                libro_actual: libro,
                categoria_sug: categoria,
                autor_sug: autor
            });
        });
    });
}

var cantidad_actual = [];

controller.buy_ul = async (req, res) => {
    const id_libro = req.body.libro;
    const id_usuario = req.params.id;
    const cantidad = req.body.cantidad;
    const tipo_envio = req.body.tipo_envio;
    const tipo_pago = req.body.tipo_pago;

    const existencias = req.body.existencias;
    const precio = req.body.precio;

    var total_se = cantidad * precio;

    var envio = (tipo_envio == 'Normal' ? 50 : 100);
    var total_ce = total_se + envio;

    var data = {
        id_libro: id_libro,
        id_usuario: id_usuario,
        cantidad: cantidad,
        tipo_envio: tipo_envio,
        tipo_pago: tipo_pago,
        total_se: total_se,
        total_ce: total_ce
    }

    if ((existencias - cantidad) >= 0 ) {
        //Insertar datos en la relación ventas
        req.getConnection((err, conn) => {
            conn.query('INSERT INTO ventas SET ?', data, (err, x) => {

            });
        });

        //Actualizar existencias de la tabla libros
        req.getConnection((err, conn) => {
            conn.query('UPDATE libros SET existencias = ? WHERE id = ?', [existencias - cantidad, id_libro], (err, y) => {

            });
        });

        //Inicio para redireccionar al index
        var novedades = []

        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM libros ORDER BY id DESC LIMIT 6', (err, seccion1) => {
                novedades = seccion1;
            });
        });
        req.getConnection((err, conn) => {
            conn.query('SELECT l.nombre, l.autor, l.isbn, l.precio, l.imagen, SUM(v.cantidad) AS libros_vendidos FROM ventas AS v JOIN libros AS l WHERE v.id_libro = l.id GROUP BY id_libro ORDER BY libros_vendidos DESC', (err, libros) => {
                res.render('./usuario_logueado/index_ulog', {
                    id_sesion: id_usuario,
                    novedades: novedades,
                    mas_vendidos: libros
                });
            });
        });
        //Fin para redireccionar al index
    } else {
        res.send('Stock Agotado Para Este Libro. Te sugerimos que intentes con una cantidad más pequeña o nos contactes para mayor información.');
    }
}

controller.myaccount = (req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('SELECT u.nombre AS nombre_usuario, u.apellido_paterno, u.apellido_materno, l.nombre, l.autor, l.isbn, l.editorial, l.precio, v.cantidad, v.total_se, v.total_ce, v.tipo_envio, v.tipo_pago, v.estatus FROM libros AS l JOIN ventas AS v ON l.id = v.id_libro JOIN usuarios AS u ON v.id_usuario = u.id WHERE v.id_usuario = ?', id, (err, compras) => {
            res.render('./usuario_logueado/mi_cuenta', {
                id_sesion: id,
                data: compras
            });
        });
    });
}

controller.tracing = (req, res) => {
    const id = req.params.id;
    const id_venta = req.params.id_venta;

    req.getConnection((err, conn) => {
        conn.query('SELECT v.id, l.imagen, l.nombre, l.autor, l.isbn, l.editorial, l.precio, v.cantidad, v.tipo_envio, v.tipo_pago, v.estatus FROM ventas AS v JOIN libros AS l ON v.id_libro = l.id WHERE v.id = ?', [id_venta], (err, seguimiento) => {
            console.log(seguimiento);
            res.render('./usuario_logueado/seguimiento_ulog', {
                id_sesion: id,
                data: seguimiento
            });
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