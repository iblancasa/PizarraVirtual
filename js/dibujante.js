
  function resizeCanvas() {
      canvas.setHeight(window.innerHeight);
      canvas.setWidth(window.innerWidth);
      canvas.calcOffset();
      canvas.renderAll();
    }

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

  function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }



  var canvas = new fabric.Canvas('canvas',
  	{
  		isDrawingMode: true
  	});

	window.addEventListener('resize', resizeCanvas, false);

	canvas.freeDrawingBrush.width=7;

	resizeCanvas();

  var socket = io();
  var id;
  var users;

	socket.on('unido',function(data){
		id=data.id;
		users=data.users;
	});


	socket.on('usuarios',function(data){
		console.log(data);
		users=data;
	});


	canvas.on('mouse:up', function(options) {
		var datosCanvas = JSON.stringify(canvas);

		var datos = {
			"id":id,
			"datosCanvas":datosCanvas
		}

				socket.emit('pintar', datos);
		});


	 var sala = getParameterByName('nombre');
   socket.emit('unir',sala);
