var express = require('express');
const narrativasController = require('../controllers/narrativasController')
var router = express.Router();

/* GET users listing. */
router.post('/', narrativasController.create);

router.get('/edit/:id', narrativasController.edit);

router.get('/delete/:id', narrativasController.destroy);

router.get('/create/', narrativasController.form);

router.get('/:id', narrativasController.index);

router.get('/', narrativasController.list);

router.put('/:id', narrativasController.update);

router.delete('/:id', narrativasController.destroy);


module.exports = router;
