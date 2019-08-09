
// Comando para establer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

//cuando se conecta al servidor
socket.on('connect', function () {
    console.log('Conectado con el servidor');
});

//cuando se desconecta del servidor
socket.on('disconnect', function () {
    console.log('Perdimos conexion con el servidor');
});

socket.on('estadoActual', function(resp){
    label.text(resp.actual);
});

$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguienteTicket){
        label.text(siguienteTicket);
    });
});