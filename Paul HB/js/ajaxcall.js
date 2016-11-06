function getSearchInfo1() {
	var match, pl = /\+/g,
	search = /([^&=]+)=?([^&]*)/g, decode = function(s) {
		return decodeURIComponent(s.replace(pl, " "));
	}, query = window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
	
	alert(urlParams["search"]);
	
	var url = "http://localhost:59187/api/Deed";

	var request = new httpRequest();
	request.method = "GET";
	request.url = url;

	// create callback for success containing the response
	request.success = function(response) {
		var info = JSON.parse(response);
		var owner = json["owner"];
		var postcode = json["postcode"];
		document.getElementById("owner").innerHTML = "<p>" + owner + "</p>";
		document.getElementById("postcode").innerHTML = postcode;
	};

	// and a fail callback containing the error
	request.fail = function(error) {
		document.getElementById("test").innerHTML = error;
	};

	request.send();
}

function getSearchInfo() {
	var match, pl = /\+/g,
	search = /([^&=]+)=?([^&]*)/g, decode = function(s) {
		return decodeURIComponent(s.replace(pl, " "));
	}, query = window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
	
	alert(urlParams["search"]);
	var json = JSON.parse('{"owner":"Horst","postcode":"123456"}');
	var owner = json["owner"];
	var postcode = json["postcode"];
	document.getElementById("owner").innerHTML = "<p>" + owner + "</p>";
	document.getElementById("postcode").innerHTML = postcode;

}

function loadUrl(location) {
	var searchInfo = document.getElementById("searchbar").value;
	alert(searchInfo);
	this.document.location.href = location + "?search=" + searchInfo;
}

function postData() {
	var owner = document.getElementById("owner").value;
	var postcode = document.getElementById("postcode").value;

	alert("owner " + owner + " postcode " + postcode);
	var data = new FormData();
	data.append('owner', owner);
	data.append('postcode', postcode);

	var url = "http://localhost:59187/api/Deed";

	var request = new httpRequest();
	request.method = "PUT";
	request.url = url;
	request.data = data;

	// create callback for success containing the response
	request.success = function(response) {
		document.getElementById("test").innerHTML = "Data saved";
	};

	// and a fail callback containing the error
	request.fail = function(error) {
		document.getElementById("test").innerHTML = error;
	};

	request.send();
}

function httpRequest() {
	var ajax = null, response = null, self = this;

	this.method = null;
	this.url = null;
	this.async = true;
	this.data = null;

	this.send = function() {
		ajax.open(this.method, this.url, this.asnyc);
		ajax.onreadystatechange = test;
		ajax.send(this.data);
	};

	if (window.XMLHttpRequest) {
		ajax = new XMLHttpRequest();

	} else if (window.ActiveXObject) {
		try {
			ajax = new ActiveXObject("Msxml2.XMLHTTP.6.0");
		} catch (e) {
			try {
				ajax = new ActiveXObject("Msxml2.XMLHTTP.3.0");
			} catch (ee) {
				self.fail("not supported");
			}
		}
	}

	if (ajax == null) {
		return false;
	}

	function test() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				self.success(this.responseText);
			} else {
				self.fail(this.status + " - " + this.statusText);
			}
		}
	}
	;
}
