var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var CRUDSchema = new Schema({
	title: String,
});
module.exports = mongoose.model('CRUD',CRUDSchema);