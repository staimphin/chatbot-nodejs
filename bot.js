
function Chatbot(){
	this.apiWeather = 'api.openweathermap.org/data/2.5/weather?id=';
	
	this.weatherResult = {
    "coord": {
        "lon": 139.69,
        "lat": 35.69
    },
    "weather": [
        {
            "id": 520,
            "main": "Rain",
            "description": "弱いにわか雨",
            "icon": "09d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 296.18,
        "pressure": 1012,
        "humidity": 83,
        "temp_min": 294.35,
        "temp_max": 297.15
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.5
    },
    "clouds": {
        "all": 75
    },
    "dt": 1535868000,
    "sys": {
        "type": 1,
        "id": 7612,
        "message": 0.0066,
        "country": "JP",
        "sunrise": 1535832829,
        "sunset": 1535879253
    },
    "id": 1850147,
    "name": "Tokyo",
    "cod": 200
};
	
	this.apiID = '7380d3cfd063f49e856e52be02c19a98';
	this.greeting = ['こんにちは'];
	this.weather = '';
	this.base = ['すみません、出来る事は：基本挨拶・東京の天気予報・時間の知らせ', '言わぬが花'];
	
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

		console.log('API call:'+apiURL);
		//call back
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
			  
			        //console.log('ajax call no error');
			       //console.log(res);
			        let json = JSON.parse(body);
				//console.log(json);
				 getCurrentweatherCallback(json);
		      }else{
			       console.log('ajax call error');
			        console.log(err);
			      weather = '天気予報は届かない。も一度やりましょうか。';
			      return callback(weather);
			}
		  });
		
		//do some interpretattion
		
	}
	
	//Bot main function
  	this.listening = function(str, callback){
		var botAnswer = '';
		console.log('chatbot listening');
		//check for a keyword
		if(typeof str === 'undefined'){
			console.log('Undefiend str');
			// get api information
			
			botAnswer = this.base[1];
			
			return callback(botAnswer);
		}
		//Greeting
		if(str.indexOf('こんにちは') !== -1){
			console.log('Greeting');
			botAnswer = this.greeting[0];
			
			return callback(botAnswer);
		}
		//Time
		else if(str.indexOf('何時') !== -1){
			console.log('time');
			time = new Date();
			var minute = time.getMinutes();
			var hour = time.getHours();
			botAnswer = (hour < 10 ? "0" : "") +hour+'時'+(minute < 10 ? "0" : "") +minute+'分です。';
			
			return callback(botAnswer);
		}
		//Weather
		else if(str.indexOf('天気') !== -1){
			console.log('weather');
			cityCode = 1850147;
			
			//botAnswer = '天気ですね。'+this.getWeather(cityCode, function (result){ return result;});
			
			return   this.getWeather(cityCode, callback );
			
		}
		//default
		else {
			console.log('Bot default answer');
			// get api information
			
			botAnswer = this.base[0];
			
			return callback(botAnswer);
		}
		
		
	}
}

exports.Chatbot = Chatbot;