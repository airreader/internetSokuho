$(function(){
  if(typeof io === 'undefined') {
    setItem('sslFlag', 0);
    $('#main').html('<p><a href="https://www9222ue.sakura.ne.jp:4000/" Target="_blank">こちらからオレオレ証明書の受け入れをお願いいたします</a></p>');
  }else{
    socket = io.connect("https://www9222ue.sakura.ne.jp:3000/", {secure: true});
    setItem('sslFlag', 1);
    socket.on('res',function(msg) {
      displayNews(msg);
    });

    $('form').submit(function(e){
      news();
      return false;
    });
  }
});

function news() {
  var msg = $('input#news').val();
  console.log('hoge');
  $('input#news').val('').focus();
  socket.emit('news', msg); //発言内容をサーバーに送る
  $('div.newsDiv').animate({ scrollTop: 2000000 }, 'fast');
  return false;
}

function displayNews(msg) {
  console.log('msg=' + msg);
  var trDom = $('<tr>');
  trDom.append($('<td>').addClass('newsTd').append(msg));
  $('table.newsTable').append(trDom);           
}

function getItem(key) { return getStorage().getItem(key); }
function setItem(key, map) { return getStorage().setItem(key, map); }
function removeItem(key) { return getStorage().removeItem(key); }
function getStorage() { return window.localStorage; }