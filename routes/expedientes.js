var express = require('express');
const expedienteController = require('../controllers/expedienteController')
var router = express.Router();

/* GET users listing. */
router.get('/:id', expedienteController.index);

router.get('/', expedienteController.list);

router.post('/', expedienteController.create);

router.put('/:id', expedienteController.update);

router.delete('/:id', expedienteController.destroy);


module.exports = router;
