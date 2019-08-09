const { io } = require('../server');

const {TicketControl} = require('../classes/ticket-control')

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    //ON aqui significa estar atento a cualquier peticion desde los clientes.
    io.on('connect', function(){
        console.log('Usuario Conectado');
    });

    io.on('disconnect', function(){
        console.log('Usuario Desconectado');
    });

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        console.log(siguiente);
        callback(siguiente);
    });


    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) =>{
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            }); 
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //actualizar o notificar cambios en lo sultimos 4
        client.broadcast.emit('ultimos4',{ultimos4: ticketControl.getUltimos4()});
    });

});