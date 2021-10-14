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
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('INSERT INTO libros SET ?', [data], (err, libros) => {
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

//Exportar el controlador
module.exports = controller;