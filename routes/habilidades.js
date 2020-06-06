var express = require('express');
const habilidadesController = require('../controllers/habilidadesController')
var router = express.Router();

/* GET users listing. */
router.get('/:id', habilidadesController.index);

router.get('/', habilidadesController.list);

router.post('/', habilidadesController.create);

router.put('/:id', habilidadesController.update);

router.delete('/:id', habilidadesController.destroy);


module.exports = router;
