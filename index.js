/**
  *
  * Main file for the node js
  *
  *
  */

//Main includes:
var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

/**
  *  Routes definitions
  *
  *
  */
var handle = { 
	"GET":{},
	"POST":{}	
};

handle["GET"]["/"] = requestHandlers.start;
handle["GET"]["/start"] = requestHandlers.start;
handle["POST"]["/chatsend"] = requestHandlers.chatsend;
handle["GET"]["/history"] = requestHandlers.history;


/**
  *
  * Main call
  *
  *  @var router: router module
  *  @var handle: object with the allowed routes for the application
  *
  */
server.start(router, handle);