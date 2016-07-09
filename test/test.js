process.env.NODE_ENV = 'test';

var mongoose = require('mongoose'),
	chai = require('chai'),
	chaiHTTP = require('chai-http');

var should = chai.should,
	expect = chai.expect;
chai.use(chaiHTTP);

var server = require('../app'),
	Model = require('../models/model');