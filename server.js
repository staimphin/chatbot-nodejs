const http = require('http');
var url = require("url");

const port = 3000;


function start(router, handle) {
	 function onRequest(request, response) {
		  var postData = "";
		  var pathname = url.parse(request.url).pathname;
		  console.log("Request received:"+pathname);
		  request.setEncoding("utf8");
		 //Request type:
		 var type = request.method;
		 //GET
		 if(request.method == 'GET'){
			 console.log('GET req');
			  router.getRoute(handle, pathname, response,type);
		 }
		 //POST
		 if(request.method == 'POST'){
			console.log('POST req');
			 //retrieve post data
			request.addListener("data", function(postDataChunk) {
			   postData += postDataChunk;
			   console.log("POST '"+ postDataChunk + "'.");
			  });
			  request.addListener("end", function() {
			   router.postRoute(handle, pathname, response, postData, type);
			});		 
			 
		 }

	 }
 http.createServer(onRequest).listen(port);
 console.log("*Server online*");
}

exports.start = start;
