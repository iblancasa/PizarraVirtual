
  var canvas = new fabric.Canvas('canvas',
    {
      isDrawingMode: false,
      selectable:false
    });




  var socket = io();

  socket.on('pintar',function(datos){
    canvas.loadFromJSON(datos);
    resizeCanvas();
    canvas.forEachObject(function(o) {
      o.selectable = false;
    });

  });





  socket.on('noAdmin',function(data){
    $('.toast').stop().html("El dibujante ha abandonado la sala").fadeIn(400).delay(3000).fadeOut(400);
  });
