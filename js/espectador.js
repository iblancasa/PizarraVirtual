  function resizeCanvas() {
      canvas.setHeight(window.innerHeight);
      canvas.setWidth(window.innerWidth);
      canvas.calcOffset();
      canvas.renderAll();
    }



  function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }


  var canvas = new fabric.Canvas('canvas',
    {
      isDrawingMode: false,
      selectable:false
    });

  window.addEventListener('resize', resizeCanvas, false);

  canvas.freeDrawingBrush.width=7;

  resizeCanvas();


  var socket = io();
  var id;
  var users;

  var sala = getParameterByName('nombre');
  socket.emit('unir',sala);

  socket.on('pintar',function(datos){
    canvas.loadFromJSON(datos);
    resizeCanvas();
    canvas.forEachObject(function(o) {
      o.selectable = false;
    });

  });


  socket.on('unido',function(data){
    id=data.id;
    users=data.users;
  });


  socket.on('usuarios',function(data){
    console.log(data);
    users=data;
  });

  socket.on('noAdmin',function(data){
    $('.toast').stop().html("El dibujante ha abandonado la sala").fadeIn(400).delay(3000).fadeOut(400);
  });
