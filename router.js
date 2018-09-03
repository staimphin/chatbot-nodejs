/**
 * Router:
 *
 *  Base functions for handling GET and POST calls
 *
 */

//GET route
function getRoute(handle, pathname, response, type) {
	if (typeof handle[type][pathname] === 'function') {
		handle[type][pathname](response);
	} else {
		//Undefined route: return 404 error
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

//POST route
function postRoute(handle, pathname, response, postData, type ) {
	console.log("POST to URL " + pathname + ".");
	if (typeof handle[type][pathname] === 'function') {
		handle[type][pathname](response, postData);
	} else {
		//Undefined route: return 404 error
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.getRoute = getRoute;
exports.postRoute = postRoute;