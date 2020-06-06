var express = require('express');
const usuariosController = require('../controllers/usuariosController')
var router = express.Router();

/* GET users listing. */
router.get('/', usuariosController.list);

router.get('/:id', usuariosController.index);

router.post('/', usuariosController.create);


router.delete('/:id', usuariosController.destroy);


module.exports = router;
