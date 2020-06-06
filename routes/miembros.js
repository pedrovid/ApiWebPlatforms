var express = require('express');
const miembrosController = require('../controllers/miembrosController')
var router = express.Router();

/* GET users listing. */
router.get('/:id', miembrosController.index);

router.get('/', miembrosController.list);

router.post('/', miembrosController.create);

router.put('/:id', miembrosController.update);

router.delete('/:id', miembrosController.destroy);


module.exports = router;
