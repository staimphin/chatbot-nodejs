/**
  *
  * Chatbot module
  *
  * Contains the mains functions of the chat bot
  *
  *
  */
  
function Chatbot(){
	this.apiWeather = 'api.openweathermap.org/data/2.5/weather?id=';// WeatherAPI URL
	this.weatherResult = {};
	this.apiID = '7380d3cfd063f49e856e52be02c19a98';
	// Predefined answer
	this.greeting = ['こんにちは'];
	this.weather = '';//will be filled 
	this.base = ['すみません、出来る事は：基本挨拶・東京の天気予報・時間の知らせ', '言わぬが花'];
	
	/**
	  *
	  * Retrieve the weather for a city code from the open weather map site.
	  *
	  */
	this.getWeather = function(cityCode, callback){
		var request = require('request');
		var apiURL = this.apiWeather +cityCode+'&appid='+this.apiID+'&lang=ja';
		const options = {  
		    url: 'https://'+apiURL,
		    method: 'GET',
		    headers: {
			'Accept': 'application/json',
			'Accept-Charset': 'utf-8'
		    }
		};

		//call back for retrieveing the weather
		function getCurrentweatherCallback(weatherJSON){
			console.log('inside the callback for weather');
			this.weatherResult = weatherJSON;
			var curWeather = this.weatherResult.weather[0].description;
			var curWeatherIcon = 'http://openweathermap.org/img/w/'+this.weatherResult.weather[0].icon +'.png';
		
			console.log('curWeather:'+curWeather);
		
			var weather = '東京の天気」は'+curWeather+'<span><img src ="'+curWeatherIcon+'" alt="'+curWeather+'">です。';
			return callback(weather);
		}
		
		//retrieve weather data from online api 
		request(options,  function(err, res, body) {
			if (!err && res.statusCode === 200) {
			        let json = JSON.parse(body);
				getCurrentweatherCallback(json);
			}else{
				console.log('ajax call error');
				console.log(err);
				//Error message to display in chat
				weather = '天気予報は届かない。も一度やりましょうか。';
				return callback(weather);
			}
		});
	}
	
	//Bot main function
  	this.listening = function(str, callback){
		var botAnswer = '';
		
		//Handle empty case
		if(typeof str === 'undefined'){
			botAnswer = this.base[1];
			
			return callback(botAnswer);
		}
		
		//Greeting
		if(str.indexOf('こんにちは') !== -1){
			botAnswer = this.greeting[0];
			
			return callback(botAnswer);
		}
		//Time
		else if(str.indexOf('何時') !== -1){
			time = new Date();
			var minute = time.getMinutes();
			var hour = time.getHours();
			botAnswer = (hour < 10 ? "0" : "") +hour+'時'+(minute < 10 ? "0" : "") +minute+'分です。';
			
			return callback(botAnswer);
		}
		//Weather
		else if(str.indexOf('天気') !== -1){
			cityCode = 1850147;//Code for Tokyo
			
			return   this.getWeather(cityCode, callback );
			
		}
		//default
		else {
			botAnswer = this.base[0];
			
			return callback(botAnswer);
		}
	}
}

exports.Chatbot = Chatbot;