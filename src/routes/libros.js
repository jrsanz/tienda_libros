const express = require('express');
const router = express.Router();

const controller =  require('../controllers/libroController');

router.get('/', controller.list);
router.post('/add', controller.save);
router.get('/delete/:id', controller.delete);
router.get('/update/:id', controller.edit);
router.post('/update/:id', controller.update);

//Exportar las rutas
module.exports = router;