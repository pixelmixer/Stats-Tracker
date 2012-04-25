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
	});

	socket.on('msg', function (msg)
	{
		socket.get('nickname', function (err, name)
		{
			console.log(name + ": ", msg);
		});
	});
});

/*var express = require('express'),
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

/*var express = require('express')
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