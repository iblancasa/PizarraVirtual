var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var puerto = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var ip = process.env.OPENSHIFT_NODEJS_IP || 'localhost';

var rooms={};

app.use(express.static(__dirname + '/'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


app.get('/sala', function(req, res){
    if(rooms[req.query.nombre]){//Existe, por tanto se le une

      res.sendFile(__dirname + '/see.html');
    }
    else{ //Él es el maestro

      res.sendFile(__dirname + '/draw.html');
    }
});



io.on('connection', function(socket){


  socket.on('unir',function(nombre){
    if(rooms[nombre]){//Existe, por tanto se le une

      var data={
        "id":0,
        "users":0,
      };

      socket.myroom=nombre;


      socket.emit('unido',data);
      socket.emit('pintar',rooms[nombre].canvas);


    }
    else{//Él es el maestro
      var id = S4() + S4() + "-" + S4() + "-"+ S4() + "-" + S4() + "-" + S4() + S4() + S4();


      var newRoom = {
        socket:socket,
        users:0,
        pass:id
      };


      rooms[nombre]=newRoom;

      socket.myroom=nombre;

      var data={
        "id":id,
        "users":0
      };

      socket.emit('unido',data);
    }

    socket.join(nombre);
    console.log("GENTE CONECTADA EN "+nombre);
    for (var socketId in io.nsps['/'].adapter.rooms['asd']) {
    console.log(socketId);
    }
  }

  );

  socket.on('pintar',function(datos){
    //rooms[socket.myroom].canvas=datos;



    socket.broadcast.to(socket.myroom).emit('pintar', datos);
    }
  );

  }
);


http.listen(puerto,ip, function(){//Lanzamos el servidor
  console.log('Iniciando servidor');
});

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
