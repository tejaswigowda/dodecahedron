
var http = require('http');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5555 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        // make http get
        http.get('http://localhost:8080?message=' + message
            , (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        }).on('error', (e) => {
            console.error(e);
        });

    });
});
