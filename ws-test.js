// node osc
var client = require('node-rest-client').Client;


const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5555 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        client.get("http://localhost:8080/position?msg=" + message, function (data, response) {
            console.log(data);
        }
    });
});
