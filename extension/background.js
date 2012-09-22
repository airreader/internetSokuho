$(function(){
  if(typeof io === 'undefined' || getItem('sslFlag') ===  0) {
    setItem('sslFlag', 0);
    window.addEventListener('storage',function(event) {
      if(event.newValue == 1 && event.key === 'sslFlag') {
        DisplayNews();
      }
    });
  }else{
    DisplayNews();
  }
  function DisplayNews(){
    $.getScript("https://www9222ue.sakura.ne.jp:3000/socket.io/socket.io.js", function(){
      socket = io.connect("https://www9222ue.sakura.ne.jp:3000/", {secure: true});
      setItem('sslFlag', 1);

      socket.on('res',function(msg) {
        console.log('res#msg=' + msg);
        setItem('msg', msg);
        chrome.tabs.executeScript(null, {file: "content_scripts.js"});  
      });
    });
  }
});


function getItem(key) { return getStorage().getItem(key); }
function setItem(key, map) { return getStorage().setItem(key, map); }
function removeItem(key) { return getStorage().removeItem(key); }
function getStorage() { return window.localStorage; }

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if(request.action === 'getMsg') {
      sendResponse(getItem('msg'));
    }
  }
);