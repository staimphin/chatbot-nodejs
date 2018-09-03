var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "chatbot"
});

con.connect(function(err) {
	  if (err) throw err;
	  console.log("DB Connected!");
});


function setHistory( data){
console.log('**set history save**');
console.log(data);
	  var sql = "INSERT INTO history (user_input, bot_response) VALUES ('"+data.user_input+"', '"+data.output+"')";
	  con.query(sql, function (err, result) {
	    if (err) throw err;
	    console.log("1 record inserted");
		  console.log(result.affectedRows);
		    console.log("1 record inserted, ID: " + result.insertId);
	  });

	
}

function getHistory( callback){
	console.log('Inside history');
	var query = "SELECT  'user_input','bot_response','response_timestamp', FROM history ORDER BY id DESC LIMIT 10";

	 con.query(query, function (err, result, fields) {response_timestamp
	    if (err) throw err;
		return callback(JSON.stringify(result));
	  });
}

exports.setHistory = setHistory;
exports.getHistory = getHistory;