
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


  var socket = io();

	canvas.on('mouse:up', function(options) {
		var datosCanvas = JSON.stringify(canvas);

		var datos = {
			"id":id,
			"datosCanvas":datosCanvas
		}

				socket.emit('pintar', datos);
		});
