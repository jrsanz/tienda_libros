const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarioController');

router.get('/', controller.index);
router.post('/search', controller.search);
router.get('/details/:isbn', controller.details);
router.post('/comprar', controller.buy);
router.get('/acceder', controller.myaccount);
router.post('/add', controller.save);
router.post('/validacion', controller.validation);
router.get('/historial', controller.record);
router.post('/historial/filterSearch', controller.filter_search);
router.get('/historial/filterDesc', controller.filter_desc);
router.get('/historial/seguimiento/:id', controller.tracing);
router.post('/historial/seguimiento/:id', controller.update_tracing);

module.exports = router;