
  var canvas = new fabric.Canvas('canvas',
    {
      isDrawingMode: false,
      selectable:false
    });
    canvas.selectable=false;


  var widthMaster,heightMaster;
  var socket = io('http://pizarravirtual-iblancasa.rhcloud.com:8000/');
  //var socket = io();

  socket.on('pintar',function(datos){

    var scaleFactor = 1;
    var mywidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var width,height;

    scaleFactor = mywidth/widthMaster;


    width = widthMaster * scaleFactor;
    height = heightMaster * scaleFactor;


    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.calcOffset();

    canvas.loadFromJSON(datos);

    if(scaleFactor != 1) {
      for(var i=0; i<canvas._objects.length; i++){
         canvas._objects[i].scale(scaleFactor);
         canvas._objects[i].setLeft(canvas._objects[i].left * scaleFactor);
         canvas._objects[i].setTop(canvas._objects[i].top * scaleFactor);
         canvas._objects[i].selectable = false;
      }
      canvas.renderAll();
    }
    canvas.selection = false;
    canvas.forEachObject(function(o) {
      o.selectable = false;
    });


    canvas.renderAll();
  });





  socket.on('noAdmin',function(data){
    $('.toast').stop().html("El dibujante ha abandonado la sala").fadeIn(400).delay(3000).fadeOut(400);
  });
