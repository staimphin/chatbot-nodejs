var querystring = require("querystring");
var fs = require('fs');
var chatbot = require("./bot");
const db = require("./db");

const currentChat =[];
/**
 *
  * page managers
  *return responses
  */
function chatpage(response) {
 console.log("time to 'start'!");
 /*var body = '<html>'+
  '<head>'+
  '<meta http-equiv="Content-Type" content="text/html; '+
  'charset=UTF-8" />'+
  '</head>'+
  '<body>'+
  '<form action="/chatsend" method="post">'+
  '<input name="user_input">'+
  '<input type="submit" value="Envoyer" />'+
  '</form>'+
  '<div>'+
  '</div>'+
  '</body>'+
  '</html>';*/
fs.readFile('index.html',function (err, data){	
  response.writeHead(200, {"Content-Type": "text/html",'Content-Length':data.length});
 // response.write(body);
  response.write(data);
  response.end();
});
}

/**
 *
  * page managers
  *return responses
  */
function chatsend(response, postData) {
	 console.log("time to 'save'!");
	 console.log(postData);
	//Q and A to save
	var question = querystring.parse(postData).user_input;
	currentChat.push( question);
	console.log(currentChat);
	var answer = '*to do*';
	var bot = new chatbot.Chatbot();
	bot.listening(question, function(botAnswer){
		answer =botAnswer;
		var data = {"user_input": question, "output": answer};
		console.log(data);
		//output
		db.setHistory(data);
		//display	
		 var body = '<li>'+answer+'</li>';
		  response.writeHead(200, {"Content-Type": "text/html"});
		  response.write(body);
		  response.end();
	});
	
	
	

}




/*
 *
 *  Return History informations
 *API
 * return JSON
 *
 */
function history(response) {
	console.log("Call to 'history' .");
	response.writeHead(200, {"Content-Type": "text/plain"});

 //var tmp =db.getHistory(response, function(result){
	db.getHistory( function(result){
	
		console.log('function history get db result');
		console.log( 'tada'); 
		console.log( result); 	

		response.write( result);
		response.end();
		// return getResults(result);
	});
}

/*
 *
 *  Return weather informations
 *
 * requiere API
 *
 */
function weather(response, postData) {
 console.log("Call to 'weather' ");
 response.writeHead(200, {"Content-Type": "text/plain"});
 response.write("Vous avez envoyé : "+ querystring.parse(postData).text);
 response.end();
}





exports.start = chatpage;
exports.chatsend = chatsend;
exports.history = history;
exports.weather = weather;