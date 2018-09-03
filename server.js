/**
  *
  * Server module
  *
  * Server management
  *
  *
  */
const http = require('http');
var url = require("url");

const port = 3000;//server port

/**
 *
 * Start the node JS Server
 *
 * @var router:
 * @var handle:
 *
 *
 */
function start(router, handle) {
	//handle request and response page
	function onRequest(request, response) {
		var postData = "";
		var pathname = url.parse(request.url).pathname;
		var type = request.method;//Request type:
		
		request.setEncoding("utf8");
		
		//GET
		if(request.method == 'GET'){
			router.getRoute(handle, pathname, response,type);
		}
		//POST
		else if(request.method == 'POST'){
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
