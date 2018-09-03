

var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

//Routes:
var handle = { "GET":{}, "POST":{}
	
	};

handle["GET"]["/"] = requestHandlers.start;
handle["GET"]["/start"] = requestHandlers.start;
handle["POST"]["/chatsend"] = requestHandlers.chatsend;
handle["GET"]["/history"] = requestHandlers.history;


server.start(router, handle);