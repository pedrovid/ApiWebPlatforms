var express = require('express');
const expedienteController = require('../controllers/expedienteController')
var router = express.Router();

/* GET users listing. */
router.get('/create', expedienteController.form);

router.get('/index/:id', expedienteController.index);

router.get('/:page?', expedienteController.list);

router.post('/', expedienteController.create);

router.put('/:id', expedienteController.update);

router.delete('/:id', expedienteController.destroy);


module.exports = router;
