var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cruds', controller.findAll);
router.get('/cruds/:id', controller.findOne);
router.post('/cruds', controller.add);
router.put('/cruds/:id', controller.update);
router.delete('/cruds/:id', controller.delete);
module.exports = router;