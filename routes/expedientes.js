var express = require('express');
const expedienteController = require('../controllers/expedienteController')
var router = express.Router();

/* GET users listing. */
router.get('/edit/:id', expedienteController.edit);

router.get('/create', expedienteController.form);

router.get('/delete/:id', expedienteController.remove);

router.get('/index/:id', expedienteController.index);

router.get('/:page?', expedienteController.list);

router.get('/list/:page?', expedienteController.listData);

router.post('/', expedienteController.create);

router.put('/:id', expedienteController.update);

router.delete('/:id', expedienteController.destroy);


module.exports = router;
