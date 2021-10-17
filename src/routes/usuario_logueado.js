const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarioLogueadoController');

router.get('/:id', controller.index_ul);
router.post('/:id/search', controller.search_ul);
router.get('/:id/details/:isbn', controller.details_ul);
router.post('/:id/comprar', controller.buy_ul);
router.get('/:id/miCuenta', controller.myaccount);
router.get('/:id/miCuenta/seguimiento/:id_venta', controller.tracing);

module.exports = router;