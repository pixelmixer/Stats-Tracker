// Module dependencies.
var express = require('express');

var app = express.createServer();

// Configuration
app.configure( function() {
});

app.listen(3000);

var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "reports", "servers"]
var db = require("mongojs").connect(databaseUrl, collections);

// app.js
db.users.save({email: "srirangan@gmail.com", password: "iLoveMongo", sex: "male"}, function(err, saved) {
  if( err || !saved ) console.log("User not saved");
  else console.log("User saved");
});

// app.js
db.users.update({email: "srirangan@gmail.com"}, {$set: {password: "iReallyLoveMongo"}}, function(err, updated) {
  if( err || !updated ) console.log("User not updated");
  else console.log("User updated");
});

// app.js
db.users.update({email: "srirangan@gmail.com"}, {$set: {sex: "female"}}, function(err, updated) {
  if( err || !updated ) console.log("User not updated");
  else console.log("User updated");
});

app.get('/', function(req, res) {
	//console.log( req );
	// app.js
	db.users.find({sex: "female"}, function(err, users) {
		if( err || !users)
			console.log("No female users found");
		else users.forEach( function(femaleUser) {
			var html = '<html><head><script type="text/javascript">console.log("'+ res +'");</script></head><body>';
			var user;
			user = femaleUser;
			//console.log( femaleUser );
			html += user.sex;
			html += req.params;

			html += '</body></html>';

			res.send( html );
		} );
	});

	
});

app.get('/registerserver/:userid/:serverip', function(req, res)
{
	var userid = req.params.userid;
	var serverip = req.params.serverip;
	db.servers.save
	({
		userid: userid, 
		serverip: serverip
	},
	function( err, saved )
	{
		if( err || !saved )
		{
			res.send( 'Error: Not Saved...' );
		}
		else
		{
			res.send( 'Saved... ' + userid + ' ' + serverip );
		}
	});
});




/*
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/my_database');

var Schema =
	mongoose.Schema,
	ObjectId = Schema.ObjectId;

var ServerSchema = new Schema(
{
	hostid	: ObjectId,
	user	: String
});


mongoose.model('Server', ServerSchema);
var ServerModel = mongoose.model('Server');

var server = new ServerModel({ user : 'Pixelmixer' });
	


	ServerModel.findOne({ user: 'Pixelmixer' }, function( err, obj )
	{
		console.log( obj );
	});

// Routes
app.get('/', function(req, res) {
	var text = server;
	
server.save(function (err)
	{
		console.log( "Helloooo" );
	});

	//MyModel.find({});
	MyModel.findOne({ user: 'Pixelmixer' }, function ( err, doc )
	{
		console.log( 'response' );
	});

	console.log( ServerModel );



	//console.log( ServerModel.find({}) );

	res.send( text );
});

*/


// retrieve my model
//var ServerHost = mongoose.model('ServerHost');

// create a blog post
//var post = new ServerHost();

// create a comment
//post.push({ users: 'Pixelmixer' });

//post.save(function (err) {
//  if (!err) console.log('Success!');
//});

/*
var express = require('express');
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen( server );

console.log( "   connected - localhost:3000" );

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket)
{
	socket.on('set nickname', function (name)
	{
    	socket.set('nickname', name, function () { socket.emit('ready'); });
    	socket.broadcast.emit( name + ' connected');
	});

	socket.on('msg', function (msg)
	{
		socket.get('nickname', function (err, name)
		{
			console.log(name + ": ", msg);
			socket.emit( 'msg', { name: name, message: msg })
		});
	});
});
*/
/*
var express = require('express'),
	app = express.createServer(),
	io = require('socket.io').listen(app);

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.static(__dirname + '/socket.io/socket.io.js'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.listen(8000);
*/
/*
var express = require('express')
	, app = express.createServer();

app.use(express.bodyParser());

app.post('/', function(req, res){
	res.send(req.body);
});

app.listen(3000);

app.get('/users/:id?', function(req, res, next){
		var id = req.params.id;
		if (id) {
				// do something
				console.log( id );
				res.send('user ' + id);
		} else {
				next();
		}
});

app.get('/users', function(req, res){
		// do something else
		console.log( req );
});
*/
/*
var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
	response.send('Hello World!');
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log("Listening on " + port);
});


app.configure(function(){
		app.use(express.methodOverride());
		app.use(express.bodyParser());
		app.use(app.router);
});

app.configure('development', function(){
		app.use(express.static(__dirname + '/public'));
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	var oneYear = 31557600000;
	app.use(express.static(__dirname + '/public', { maxAge: oneYear }));
	app.use(express.errorHandler());
});

app.configure(function(){
		app.set('views', __dirname + '/views');
		app.set('views');
		// => "/absolute/path/to/views"

		app.enable('some feature');
		// same as app.set('some feature', true);

		app.disable('some feature');
		// same as app.set('some feature', false);

		app.enabled('some feature')
		// => false
 });

app.get('/user/:id', function(req, res){
		res.send('user ' + req.params.id);
});

app.get(/^\/users?(?:\/(\d+)(?:\.\.(\d+))?)?/, function(req, res){
		res.send(req.params);
});
*/