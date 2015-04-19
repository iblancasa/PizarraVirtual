
  function color(color,nombre){
      canvas.freeDrawingBrush.color=color;
      canvas.freeDrawingBrush.width=7;

      $('.toast').stop().html(nombre).fadeIn(400).delay(3000).fadeOut(400);
    }

  function goma(){
      canvas.freeDrawingBrush.color='#ffffff';
      canvas.freeDrawingBrush.width=12;
      $('.toast').stop().html('Goma de borrar').fadeIn(400).delay(3000).fadeOut(400);
    }


  var canvas = new fabric.Canvas('canvas',
  	{
  		isDrawingMode: true
  	});



	canvas.freeDrawingBrush.width=7;


  var socket = io('http://pizarravirtual-iblancasa.rhcloud.com:8000/');


  $( window ).resize(function(){
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

      var unir = {
        "id":id,
        "width":width,
        "height":height
      }
      socket.emit('giro',unir);
  });

	canvas.on('mouse:up', function(options) {
		var datosCanvas = JSON.stringify(canvas);

		var datos = {
			"id":id,
			"datosCanvas":datosCanvas
		}

				socket.emit('pintar', datos);
		});
