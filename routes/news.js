var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/internetSokuho');

function validator(v) {
    console.log("validator "+  v);
    return v.length > 0;
}

var newsSchema = mongoose.Schema({
  date: { type: Date, default: Date.now },
  body: { type: String, validate: [validator, "Empty Error"] },
});

var newsdb = db.model('News', newsSchema);

exports.messages = [];
exports.news = function(client) {
	var messages = exports.messages;
	var io = exports.io;

		// メッセージを受けたときの処理
	client.on('news', function(msg) {
		//console.log("メッセージを送信しました。(msg=" + msg + ")");
		messages.push({'msg' :msg});
		// つながっているクライアント全員に送信
		io.sockets.emit('res',msg);
		var newNews = new newsdb({ body: msg});
		newNews.save(function(err) {
				if(err) {
					console.log(err);
				} else {
					console.log('done');
				}
    });
	});

	/* クライアントが切断したときの処理
	client.on('disconnect', function(){
		console.log(client.sessionId + 'が切断しました。');
			io.sockets.emit('res', 'system', msg);
			messages.push({'msg' :msg});
	});*/
}



