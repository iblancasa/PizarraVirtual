var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var puerto = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000;
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


  io.on('giro',function(data){
    console.log(data);
    if(rooms[socket.myroom].pass==data.id){
      socket.broadcast.to(socket.myroom).emit('giro', data);
      rooms[socket.myroom].width=data.width;
      rooms[socket.myroom].height=data.height;
      }
  });

  socket.on('unir',function(mensaje){
    if(rooms[mensaje.sala]){//Existe, por tanto se le une

      rooms[mensaje.sala].users+=1;
      var data={
        "id":0,
        "users":rooms[mensaje.sala].users,
        "width":rooms[mensaje.sala].width,
        "height":rooms[mensaje.sala].height
      };

      socket.myroom=mensaje.sala;


      socket.emit('unido',data);
      socket.emit('pintar',rooms[mensaje.sala].canvas);
      socket.broadcast.to(socket.myroom).emit('usuarios',rooms[mensaje.sala].users);


    }
    else{//Él es el maestro
      var id = S4() + S4() + "-" + S4() + "-"+ S4() + "-" + S4() + "-" + S4() + S4() + S4();

      var newRoom = {
        socket:socket,
        users:1,
        pass:id,
        width:mensaje.width,
        height:mensaje.height
      };

      rooms[mensaje.sala]=newRoom;

      socket.myroom=mensaje.sala;

      var data={
        "id":id,
        "users":1
      };

      socket.emit('unido',data);
    }

    socket.join(mensaje.sala);

  }

  );

  socket.on('pintar',function(datos){

    if(rooms[socket.myroom].pass==datos.id){
      socket.broadcast.to(socket.myroom).emit('pintar', datos.datosCanvas);
      rooms[socket.myroom].canvas=datos.datosCanvas;
      }
    }
  );

  socket.on('disconnect', function () {
    if(rooms[socket.myroom]){//Evitar problemas primera conexión
      rooms[socket.myroom].users-=1;
      socket.broadcast.to(socket.myroom).emit('usuarios',rooms[socket.myroom].users);

      if(rooms[socket.myroom].socket==socket){
        socket.broadcast.to(socket.myroom).emit('noAdmin');
        rooms[socket.myroom].users=null;
        rooms[socket.myroom].pass=null;
        rooms[socket.myroom].canvas=null;
        rooms[socket.myroom].socket=null;
        rooms[socket.myroom]=null;
      }
    }
  });

  }
);


http.listen(puerto,ip, function(){//Lanzamos el servidor
  console.log('Iniciando servidor en el puerto '+ puerto);
});

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
