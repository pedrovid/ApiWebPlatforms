var express = require('express');
const integrantesController = require('../controllers/integrantesController')
var router = express.Router();

/* GET users listing. */
router.get('/edit/:id', integrantesController.edit);

router.get('/create', integrantesController.form);

router.get('/:id', integrantesController.index);

router.get('/', integrantesController.list);

router.get('/list/:page?', integrantesController.listData);

router.post('/', integrantesController.create);

router.put('/:id', integrantesController.update);

router.delete('/:id', integrantesController.destroy);

module.exports = router;
