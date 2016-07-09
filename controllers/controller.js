var CRUDModel = require('../models/model');
module.exports = {
	index: function(req, res, next){
		res.render('index');
	},
	findAll: function(req, res, next){
		CRUDModel.find({}, function(err, data){
			if(err){
				res.json(err);
			}else{
				res.json(data);
			}
		})
	},
	findOne: function(req, res, next){
		CRUDModel.findOne({_id:req.params.id}, function(err, data){
			if(err){
				res.json(err);
			}else{
				res.json(data);
			}
		});
	},
	add: function(req, res, next){
		var Data = new CRUDModel({
			title: req.body.title
		});
		Data.save(function(err, data){
			if(err){
				res.json(err);
			}else{
				res.json({'Success' : data});
			}
		})
	},
	update: function(req, res, next){
		CRUDModel.findById(req.params.id, function(err, data){
			data.title = req.body.title;
			data.save(function(err, data){
				if(err){
					res.json(err);
				}else{
					res.json({'UPDATED' : data});
				}
			})
		})
	},
	delete: function(req, res, next){
		CRUDModel.findById(req.params.id, function(err, data){
			if(err){
				res.json(err);
			}else{
				data.remove(function(err, data){
					if(err){
						res.json(err);
					}else{
						res.json({'REMOVED': data});
					}
				})				
			}
		})
	}
}
