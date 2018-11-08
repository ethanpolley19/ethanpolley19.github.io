var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/index.html', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/onlinegame.html', function(req, res) {
  res.sendFile(__dirname + '/onlinegame.html');
});
app.get('/script.js', function(req, res) {
  res.sendFile(__dirname + '/script.js');
});

app.get('/styles.css', function(req, res) {
  res.sendFile(__dirname + '/styles.css');
});


//io.on('connection', function(socket) {
//	console.log("New User Connected: %d", socket.id);

//});

io.on('connection', function(socket) {
  socket.join('rpsGame');

  socket.on('gamePlayed', function(msg) {
    socket.broadcast.emit('gamePlayed', msg);
  });

  socket.on('readyToPlay', function() {
    socket.broadcast.emit('readyToPlay');
  });



});



http.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address()
    .port, app.settings.env);
});
