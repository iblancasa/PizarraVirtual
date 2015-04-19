  function resizeCanvas() {
      canvas.setHeight(window.innerHeight);
      canvas.setWidth(window.innerWidth);
      canvas.calcOffset();

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
    widthMaster=data.width;
    heightMaster=data.height;
		id=data.id;
    $('#nUsers').html(data.users);
	});

  socket.on('usuarios',function(data){
    $('#nUsers').html(data);
  });

  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

  var unir = {
    "sala":sala,
    "width":width,
    "height":height
  }
  socket.emit('unir',unir);
