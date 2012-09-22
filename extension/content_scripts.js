chrome.extension.sendRequest({"action": "getMsg"}, function(response) {
	var p = document.getElementsByTagName('body')[0];
	var d = document.createElement('div');
	var t = document.createTextNode('||　インターネットニュース速報　||')
	var n = document.createTextNode(response);

	d.setAttribute('id', 'newsDiv');
	d.appendChild(t);
	p.insertBefore(d,p.firstChild);

	setTimeout( function() {
		p.insertBefore(d,p.firstChild);
		setTimeout( function() {
			document.body.removeChild(d);
			setTimeout( function() {
				p.insertBefore(d,p.firstChild);
				setTimeout( function() {
					document.body.removeChild(d);
					display();
				}, 1000);
			}, 1000);
		}, 1000);
	}, 1000);

	function display() {
		setTimeout( function() {
			d.firstChild.nodeValue = response;
			p.insertBefore(d,p.firstChild);
			setTimeout( function() {
				document.body.removeChild(d);
			}, 5000);
		}, 1000);
	}


});