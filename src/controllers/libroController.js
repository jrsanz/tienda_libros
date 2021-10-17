const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros', (err, libros) => {
            if (err) {
                res.json(err);
            }

            res.render('libros', {  //Hace referencia a una vista
                data: libros
            });
        });
    });
};

controller.save = (req, res) => {
    const nombre = req.body.nombre;
    const autor = req.body.autor;
    const isbn = req.body.isbn;
    const editorial = req.body.editorial;
    const num_paginas = req.body.num_paginas;
    const idioma = req.body.idioma;
    const categoria = req.body.categoria;
    const precio = req.body.precio;
    const imagen = "/uploads/" + req.file.originalname;
    const sinopsis = req.body.sinopsis;

    var data = {
        nombre: nombre,
        autor: autor,
        isbn: isbn,
        editorial: editorial,
        num_paginas: num_paginas,
        idioma: idioma,
        categoria: categoria,
        precio: precio,
        imagen: imagen,
        sinopsis: sinopsis
    }

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO libros SET ?', data, (err, libros) => {
            res.redirect('/libros');  //Redirecciona al index
        });
    });
};

controller.delete = (req, res) => {
    const id = req.params.id;  //req.params recupera lo que está en la url

    req.getConnection((err, conn) => {
       conn.query('DELETE FROM libros WHERE id = ?', [id], (err, libros) => {
          res.redirect('/libros');
       });
    });
};

controller.edit = (req, res) => {
    const id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE id = ?', [id], (err, libro) => {
            res.render('libros_edit', {
                data: libro[0]  //Se pone el indice 0 porque es un arreglo y solo regresa un elemento de ese arreglo
            });
        });
    });
};

controller.update = (req, res) => {
    const id = req.params.id;
    const nuevo = req.body;

    req.getConnection((err, conn) => {
        conn.query('UPDATE libros SET ? WHERE id = ?', [nuevo, id], (err, libro) => {
            res.redirect('/libros');
        });
    });
};

controller.filter_asc = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (data['filtrar_asc'] == 'todos') {
            conn.query('SELECT * FROM libros ORDER BY id ASC', (err, libros) => {
                res.render('libros', {
                    data: libros
                });
            });
        }
        else if (data['filtrar_asc'] == 'paginas') {
            conn.query('SELECT * FROM libros ORDER BY num_paginas ASC', (err, libros) => {
                res.render('libros', {
                    data: libros
                });
            });
        }
        else if (data['filtrar_asc'] == 'precio') {
            conn.query('SELECT * FROM libros ORDER BY precio ASC', (err, libros) => {
                res.render('libros', {
                    data: libros
                });
            });
        }
    });
};

controller.filter_desc = (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (data['filtrar_desc'] == 'todos') {
            conn.query('SELECT * FROM libros ORDER BY id DESC', (err, libros) => {
                res.render('libros', {
                    data: libros
                });
            });
        }
        else if (data['filtrar_desc'] == 'paginas') {
            conn.query('SELECT * FROM libros ORDER BY num_paginas DESC', (err, libros) => {
                res.render('libros', {
                    data: libros
                });
            });
        }
        else if (data['filtrar_desc'] == 'precio') {
            conn.query('SELECT * FROM libros ORDER BY precio DESC', (err, libros) => {
                res.render('libros', {
                    data: libros
                });
            });
        }
    });
};

controller.filter_search = (req, res) => {
    const data = req.body;

    //filtrar_search hace referencia al nombre del input
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros WHERE nombre LIKE "%"?"%" OR autor LIKE "%"?"%" OR isbn LIKE "%"?"%" OR editorial LIKE "%"?"%"', [data.filtrar_search, data.filtrar_search, data.filtrar_search, data.filtrar_search], (err, libros) => {
            res.render('libros', {
                data: libros
            });
        });
    });
};

//Exportar el controlador
module.exports = controller;