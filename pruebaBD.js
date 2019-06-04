var express = require('express');
var mysql = require('mysql');
var app = express();
/*var path = require('path');

app.use(express.static(__dirname+'/public'));*/

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'elefante360',
  database: 'pruebavacantes',
  port:3307
});

con.connect(function(err) {
  if (!!err){
  	console.log('Error primero');
  }
  else
  {
  	console.log('Conexion');
  }
});

app.get('/',function(req,resp)
{
	 con.query("SELECT * FROM vacantes", function (err, rows, fields) {
    if (!!err) {
    console.log('Error segundo');
	}else{
		console.log('SUCESS!\n');
		console.log(rows);
		resp.send({rows:rows});
	}
  });
})

app.get('/Servidor/:user',function(req,resp)
{
	 con.query("SELECT * FROM vacantes", function (err, rows, fields) {
    if (!!err) {
    console.log('Error segundo');
	}else{
		console.log('SUCESS!\n');
		console.log(rows);
		resp.send({rows:rows});
	}
  });
})

app.listen(1337);
