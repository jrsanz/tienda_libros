const {bus} = require("nodemon/lib/utils");
const controller = {};

controller.index = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM libros ORDER BY id DESC LIMIT 6', (err, libros) => {
            res.render('index', {
                data: libros
            });
        });
    });
};

controller.search = (req, res) => {
    const data = req.body;
    const buscar = req.body.search_book;

    console.log(data);

    if (buscar == '') {
        res.render('libros_search', {
            data: false
        });
    }
    else {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM libros WHERE nombre LIKE "%"?"%" OR autor LIKE "%"?"%" OR isbn LIKE "%"?"%" OR editorial LIKE "%"?"%"', [data.search_book, data.search_book, data.search_book, data.search_book], (err, libros) => {
                res.render('libros_search', {
                    data: libros
                });
            });
        });
    }
}

module.exports = controller;