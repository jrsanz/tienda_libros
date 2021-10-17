const express = require('express');
const router = express.Router();

const controller =  require('../controllers/libroController');

router.get('/', controller.list);
router.post('/add', controller.save);
router.get('/delete/:id', controller.delete);
router.get('/update/:id', controller.edit);
router.post('/update/:id', controller.update);
router.post('/filterAsc', controller.filter_asc);
router.post('/filterDesc', controller.filter_desc);
router.post('/filterSearch', controller.filter_search);
router.get('/provider', controller.list_providers);
router.post('/provider/add', controller.save_provider);
router.post('/provider/add_payment', controller.save_provider_payment);

//Exportar las rutas
module.exports = router;