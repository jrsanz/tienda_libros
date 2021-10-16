const express = require('express');
const router = express.Router();

const controller = require('../controllers/usuarioController');

router.get('/', controller.index);
router.post('/Search', controller.search);

module.exports = router;