process.env.NODE_ENV = 'test';

var mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http');

var should = chai.should();
chai.use(chaiHTTP);

var server = require('../app'),
	Model = require('../models/model');

describe('Cruds', function(){
	Model.collection.drop();
	beforeEach(function(done){
		var newData = new Model({
			title: 'My title',
		});
 	newData.save(function(err) {
		done();
		});
	});
	afterEach(function(done){
		Model.collection.drop();
		done();
	});
  it('should list one title on /cruds/<id> GET', function(done) {
      var newData = new Model({
        title: 'Hello Title'
      });
      newData.save(function(err, data) {
        chai.request(server)
          .get('/cruds/'+data.id)
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('title');
            res.body.title.should.equal('Hello Title');
            res.body._id.should.equal(data.id);
            done();
          });
      });
  });
	it('should list all titles on /cruds GET', function(done) {
    chai.request(server)
      .get('/cruds')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('title');
        res.body[0].title.should.equal('My title');
        done();
      });
  });
	it('should add a title on /cruds POST', function(done) {
    chai.request(server)
      .post('/cruds')
      .send({'title': 'Hello Title'})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('Success');
        res.body.Success.should.be.a('object');
        res.body.Success.should.have.property('title');
        res.body.Success.should.have.property('_id');
        res.body.Success.title.should.equal('Hello Title');
        done();
      });
  });
  it('should update a title on /cruds/<id> PUT', function(done) {
    chai.request(server)
      .get('/cruds')
      .end(function(err, res){
        chai.request(server)
          .put('/cruds/'+res.body[0]._id)
          .send({'title': 'Test Title'})
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('UPDATED');
            response.body.UPDATED.should.be.a('object');
            response.body.UPDATED.should.have.property('title');
            response.body.UPDATED.should.have.property('_id');
            response.body.UPDATED.title.should.equal('Test Title');
            done();
        });
      });
  });
  it('should delete a title on /cruds/<id> DELETE', function(done) {
    chai.request(server)
      .get('/cruds')
      .end(function(err, res){
        chai.request(server)
          .delete('/cruds/'+res.body[0]._id)
          .end(function(error, response){
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.be.a('object');
            response.body.should.have.property('REMOVED');
            response.body.REMOVED.should.be.a('object');
            response.body.REMOVED.should.have.property('title');
            response.body.REMOVED.should.have.property('_id');
            response.body.REMOVED.title.should.equal('My title');
            done();
        });
      });
  });  	


})
