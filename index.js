var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var app = express();

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});  

mongoose.connect('mongodb://localhost:27017/nodekb');
var db = mongoose.connection;

//Connected
db.once('open',function () {
	console.log('Connected to database!');
});

// Check for db errors
db.on('error', function(err){
	     console.log("Mongoose default connection has occured "+err+" error");
	});

//Bring in model
var Todo = require('./models/todo');

app.post('/addItem',urlencodedParser, function (req,res) {
	console.log('insert request encountered for item : ' + req.body.item);
	var todoitem = new Todo({
		item : req.body.item
	});

	todoitem.save(function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Saved ' + req.body.item + ' into DB');
			res.redirect('/todoList');
		}
	});
});

app.get('/todoList',function(req,res){

	Todo.find({},function (err,items) {
		if (err) {
			console.log(err);
		} else {
			res.json(items);
		}
	});
});

app.post('/delete',urlencodedParser,function(req,res){
		console.log('delete request for item : + ' + req.body.item);
		Todo.find({ item:req.body.item}).remove().exec();

		res.redirect('/todoList');
		
});

app.get('/',function (req,res) {
	res.sendFile(__dirname+'/views/home.html');
});

//Start the Server
app.listen(3000,function (argument) {
	console.log('app started');
});