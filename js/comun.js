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

  window.addEventListener('resize', resizeCanvas, false);
  resizeCanvas();

  var id;
  var sala = getParameterByName('nombre');

  socket.on('unido',function(data){
		id=data.id;
		users=data.users;
	});

  socket.on('usuarios',function(data){

  });

  socket.emit('unir',sala);
