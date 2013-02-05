var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

app.listen(9999);

function handler (req, res) {
    fs.readFile('messages.txt', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(data);
            res.end();
    });
}

io.sockets.on('connection', function (socket) {
    socket.on('shout', function (data) {
        socket.broadcast.emit('update', data);
        var fileText = data.name + ": " + data.text + '\n';
        fs.appendFile('messages.txt', fileText, function (err) {
            if (err) throw err;
        });
    });
});