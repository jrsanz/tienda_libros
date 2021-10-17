const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarioController');

router.get('/', controller.index);
router.post('/search', controller.search);
router.get('/details/:isbn', controller.details);
router.post('/comprar', controller.buy);
router.get('/acceder', controller.myaccount);
router.post('/add', controller.save);
router.post('/Validacion', controller.validation);
//router.get('/miCuenta/:id', controller.login);

module.exports = router;