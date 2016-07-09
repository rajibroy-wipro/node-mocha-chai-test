var express = require('express');
var router = express.Router();
var controller = require('../../controllers/controller');

module.exports = function(app) {
	router.get('/', controller.index);
	router.get('/cruds/:id', controller.findOne);
	router.get('/cruds', controller.findAll);
	router.post('/cruds', controller.add);
	router.put('/cruds/:id', controller.update);
	router.delete('/cruds/:id', controller.delete);
	app.use(router);
};