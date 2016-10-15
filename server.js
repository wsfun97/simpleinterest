/*type http://127.0.0.1:8099/simpleinterest?p=1000&r=0.05&t=10 in browser*/
/*or type curl -v -X GET "http://127.0.0.1:8099/simpleinterest?p=1000&r=0.05&t=10" in client terminal,
it will return {"principal":"1000","rate":"0.05","time":"10","interest":500} to client.*/



var http = require('http');
var url  = require('url');

var server = http.createServer(function (req,res) {
	function SimpleInterest(P,i,t) {
		this.principal = P;
		this.rate = i;
		this.time = t;
		this.interest = P * i * t;
	}
	
	console.log("INCOMING REQUEST: " + req.method + " " + req.url);

	var parsedURL = url.parse(req.url,true); //true to get query as object
	var queryAsObject = parsedURL.query;
	
	if(parsedURL.pathname=='/simpleinterest'){

		var obj = new SimpleInterest(queryAsObject.p, queryAsObject.r, queryAsObject.t);
		if (queryAsObject.format == "html") {//the result format is html
			res.writeHead(200, {"Content-Type" : "text/html"});
			res.write('<html><head><title>SimpleInterest</title></head>');
			res.write('<body><H1>Principal: ' + obj.principal + '</H1>');
			res.write('<body><H1>Rate: ' + obj.rate + '</H1>');
			res.write('<body><H1>Time: ' + obj.time + '</H1>');
			res.write('<body><H1>Interest: ' + obj.interest + '</H1>');
			res.end('</body></html>');
		}
		else{//the result format is json, e.g. {"principal":"1000","rate":"0.05","time":"10","interest":500}
			res.writeHead(200, {"Content-Type" : "application/json"});
			//The JSON.stringify() method converts a JavaScript value to a JSON string
    			res.end(JSON.stringify(obj));
		}

	}else{
		res.writeHead(404, {"Content-Type": "text/plain"});
		res.write("404 Not Found\n");
		res.end();
	}
});


server.listen(process.env.PORT || 8099);
