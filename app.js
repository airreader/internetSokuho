var https = require('https');
var fs = require("fs");
var news = require('./routes/news');

//log4js
var log4js = require('log4js');
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/access.log'), 'access');
var logger = log4js.getLogger('access');
logger.setLevel('INFO');

var privateKey = fs.readFileSync('privatekey.pem');
var certificate = fs.readFileSync('certificate.pem');

var express = require('express');
var io = require('socket.io').listen(3000, {key: privateKey, cert: certificate});

var app = express();
https.createServer({key: privateKey, cert: certificate}, app).listen(4000);

app.configure(function() {
	app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO}));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
});

//ルーティング
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/ok.html');
});


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    //console.log(data);
  });
});

news.io = io;
io.sockets.on('connection', news.news);
