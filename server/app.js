
const express = require('express');
const cors = require("cors");
const app = express();
app.use(cors());
cors({credentials: true, origin: true});
const server = app.listen(3001, function() {
    console.log('server running on port 3001');
});
app.all("/",function(req,res){
    res.header ('Access-Control-Allow-Origin', '*');
    res.header ('Access-Control-Allow-Credentials', true);
    res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    res.header ('Access-Control-Allow-Headers', 'Content-Type');
});

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
        io.emit('MESSAGE', data)
    });
});