var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var puerto = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/'));

var rooms={};


io.on('connection', function(socket){

  //Creación de una sala
  socket.on('crear', function (nombre) {

  });

  socket.on('pintar',function(datos){
    socket.broadcast.emit('pintar',datos);
  });

  }
);


http.listen(puerto,ip, function(){//Lanzamos el servidor
  console.log('Iniciando servidor');
});
