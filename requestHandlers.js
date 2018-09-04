/**
  *
  * RequestHandler module
  *
  * Contains the mains functions for displaying contents
  *
  *
  */
var querystring = require("querystring");
var fs = require('fs');
var chatbot = require("./bot");
const db = require("./db");

const currentChat =[];

/**
  * Main page: display the chat page
  *
  */
function chatpage(response) {
	fs.readFile('index.html',function (err, data){	
		response.writeHead(200, {"Content-Type": "text/html",'Content-Length':data.length});
		response.write(data);
		response.end();
	});
}

/**
  *
  * Return the bot response
  * 
  */
function chatsend(response, postData) {
	var question = querystring.parse(postData).user_input;
	currentChat.push( question);
	console.log(currentChat);
	var answer = '';
	var bot = new chatbot.Chatbot();
	bot.listening(question, function(botAnswer){
		answer =botAnswer;
		var data = {"user_input": question, "output": answer};
		console.log(data);
		//output
		db.setHistory(data);
		time = new Date();
		var seconds = time.getSeconds();
		var minute = time.getMinutes();
		var hour = time.getHours();
		botAnswer = (hour < 10 ? "0" : "") +hour+':'+(minute < 10 ? "0" : "") +minute+':'+(seconds < 10 ? "0" : "")+seconds+' Bot >';
		//display	
		var body = '<li>'+botAnswer+answer+'</li>';
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(body);
		response.end();
	});
}

/**
  *
  *  Return History informations
  *API
  * return JSON
  *
  */
function history(response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	db.getHistory( function(result){
		response.write( result);
		response.end();
	});
}


exports.start = chatpage;
exports.chatsend = chatsend;
exports.history = history;