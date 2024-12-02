// node osc

const osc = require('osc');
const udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 6666,
    metadata: true
});

udpPort.open();



const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5555 });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        udpPort.send({
            address: "/message",
            args: [
                {
                    type: "s",
                    value: message
                }
            ]
        });
    });
});
