var process = require('process')
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const Client = require('./client.js');

process.on('SIGINT', () => {
    console.log("Exiting...");
    process.exit(0);
});

class DropIt {

    constructor(port) {
        this.wss = new WebSocket.Server({ port: port });
        this.wss.on('connection', (socket, request) => this.onConnection(new Client(socket, request)));
        this.wss.on("headers", (headers, response) => this.setHeaders(headers, response));
        this.chambers = {};
        console.log(`Server started on port ${port}`);

    }

    setHeaders(headers, response) {
        if (response.headers.cookie && response.headers.cookie.indexOf('peerid=') > -1) return;
        response.peerId = uuidv4();
        headers.push('Set-Cookie: peerid=' + response.peerId + "; SameSite=Strict; Secure");
    }

    onConnection(Client) {
        console.log("Client connected");
        Client.printClientInfo();
        if (!this.chambers[Client.ip]) {
            console.log("New chamber created for " + Client.ip);
            this.chambers[Client.ip] = {};
        }

        if (Object.keys(this.chambers[Client.ip]).length >= 10) {
            this.sendMessage(Client, { mode: "Error", error: "Chamber is full" });
            Client.socket.close();
            return;
        }

        Client.socket.on('message', message => this.onMessage(Client, message));
        Client.socket.on('close', () =>this.leaveChamber(Client));
        this.checkLive(Client);
    }


    onMessage(Sender, message) {
        try {
            message = JSON.parse(message);
        } catch (e) {
            return;
        }
        switch (message.mode) {
            case "Join":
                Sender.peer = message.peer;
                Sender.name.displayName = message.name;
                this.joinChamber(Sender);
                break;
            case 'Leave':
                this.leaveChamber(Sender);
                break;
            case "Pong":
                Sender.HeartBeat = Date.now();
                break;
            case "FileProgress":
                this.sendMessage(this.chambers[Sender.ip][message.senderId], message);
                break;
            case "FileTransferComplete":
                console.log("File transfer complete");
                this.sendMessage(this.chambers[Sender.ip][message.senderId], message);
                break;
               
            default:
                console.log("Unknown message mode");
                break;
        }
    }

    joinChamber(Client) {
        this.sendMessage(Client, { mode: "Joined", id: Client.id });
        const otherClients = [];
        for (const otherClientsID in this.chambers[Client.ip]) {
            const otherClient = this.chambers[Client.ip][otherClientsID];
            this.sendMessage(otherClient, { mode: "Client-Joined", Client: Client.fetchDetails() });
            otherClients.push(otherClient.fetchDetails());
        }

        this.sendMessage(Client, {
            mode: "Clients-Present",
            Clients: otherClients
        });

        this.chambers[Client.ip][Client.id] = Client;
    
    }

    leaveChamber(Client) {
        if (!this.chambers[Client.ip] || !this.chambers[Client.ip][Client.id])return;
           
        this.killLive(this.chambers[Client.ip][Client.id]);

        delete this.chambers[Client.ip][Client.id];
        Client.socket.terminate();

        if (!Object.keys(this.chambers[Client.ip]).length) {
            delete this.chambers[Client.ip];
        } else {
            // notify all other peers
            for (const ClientId in this.chambers[Client.ip]) {
                const otherClient = this.chambers[Client.ip][ClientId];
                this.sendMessage(otherClient, { mode: 'Client-Left', ClientId: Client.id });
            }
        }

    }

    checkLive(Client) {
        this.killLive(Client);
        let timeout = 30 * 1000;

        if (Client.HeartBeat == undefined) {
            Client.HeartBeat = Date.now();
        }

        if (Date.now() - Client.HeartBeat > 2 * timeout) {
            console.log("Client timed out");
            if (!this.chambers[Client.ip] || !this.chambers[Client.ip][Client.id])
            {
                console.log("Client not joined the chamber yet so killing it");
                Client.socket.terminate();
            }
            else this.leaveChamber(Client);
            return;
        }
        this.sendMessage(Client, { mode: "Ping" });

        Client.timerId = setTimeout(() => this.checkLive(Client), timeout);
    }

    killLive(Client) {
        if (Client && Client.timerId) {
            clearTimeout(Client.timerId);
        }

    }

    sendMessage(Client, message) {
        if (!Client) return;
        if (this.wss.readyState !== this.wss.OPEN) return;
        message = JSON.stringify(message);
        Client.socket.send(message);
    }


}

const dropIt = new DropIt(8080);
