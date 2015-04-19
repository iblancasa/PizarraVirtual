
  var canvas = new fabric.Canvas('canvas',
    {
      isDrawingMode: false,
      selectable:false
    });
    canvas.selectable=false;


  var widthMaster,heightMaster;
  var socket = io('http://pizarravirtual-iblancasa.rhcloud.com:8000/');

  socket.on('pintar',function(datos){

    var scaleFactorH = 1;
    var scaleFactorW = 1;
    var mywidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    var myheight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
    var width,height;

    scaleFactorH = myheight/heightMaster;
    scaleFactorW = mywidth/widthMaster;

    width = widthMaster * scaleFactorW;
    height = heightMaster * scaleFactorH;


    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.calcOffset();

    canvas.loadFromJSON(datos);

    if(scaleFactorW != 1) {
      for(var i=0; i<canvas._objects.length; i++){
         canvas._objects[i].scale(scaleFactorW);
         canvas._objects[i].setLeft(canvas._objects[i].left * scaleFactorW);
         canvas._objects[i].setTop(canvas._objects[i].top * scaleFactorW);
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
