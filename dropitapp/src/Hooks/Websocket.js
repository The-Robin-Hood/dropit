/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import Peer from "peerjs";

const Websocket = ({ ws, peer, setpeerId, Clients, setClients, setFileDetails, setReceiving, setSending,setuserId,setSnackBarState,setSendFileDetails}) => {
    useEffect(() => {
        ws.current = new WebSocket("wss://192.168.0.155:8080/webrtc");
        ws.current.onopen = () => {
            console.log("ws opened");
            const servers = {
                'iceServers':
                    [
                        {
                            'urls':
                                ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
                        }
                    ], 'sdpSemantics': 'unified-plan'
            };
            peer.current = new Peer(undefined, servers);
            peer.current.on('open', id => {
                setpeerId(id);
            });
            peer.current.on('connection', conn => {
                console.log("Connection made with Remote Peer");
                let receiveBuffer = [];
                let receiveBufferLength = 0;
                let count = 0;
                conn.on('data', data => {
                    receiveBufferLength += data.buffer.byteLength;
                    receiveBuffer.push(data.buffer);
                    setReceiving(true);
                    setFileDetails({
                        name: data.filename,
                        size: data.filesize,
                        progress: Math.round(receiveBufferLength * 100 / data.filesize),
                        count: data.filecount,
                        receiveBuffer: receiveBuffer,
                        senderId:data.senderId
                    });
                    ws.current.send(JSON.stringify({ mode: 'FileProgress',fileName:data.filename, progress: Math.round(receiveBufferLength * 100 / data.filesize),senderId: data.senderId}));
                    if(receiveBufferLength === data.filesize){
                        receiveBuffer = [];
                        receiveBufferLength = 0;
                        count++;
                    }
                    if(data.filecount === count)
                    {
                        ws.current.send(JSON.stringify({ mode: 'FileTransferComplete',senderId: data.senderId}));
                        count =0;
                    }
                });
            });


        };

        ws.current.onclose = () => console.log("ws closed");

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, [ws]);

    useEffect(() => {
        if (!ws.current) return;

        ws.current.onmessage = (event) => {
            var data = JSON.parse(event.data);
            if (data.mode === 'Ping') {
                ws.current.send(JSON.stringify({ mode: 'Pong' }));
            }
            if(data.mode === 'Joined')
            {
                setuserId(data.id);
            }
            if (data.mode === 'Clients-Present') {
                data.Clients.map(Client => setClients(existingClients => [...existingClients, Client]));

            }
            if (data.mode === 'Client-Joined') {
                setClients(existingClients => [...existingClients, data.Client]);

            }
            if (data.mode === 'Client-Left') {
                setClients(existingClients => existingClients.filter(x => x.id !== data.ClientId));
                setReceiving(false);
                setSending(false);

            }
            if (data.mode === 'FileProgress') {
                setSending(true);
                setSendFileDetails({
                    name: data.fileName,
                    progress: data.progress,
                });
            }
            if (data.mode === "FileTransferComplete") {
                setSending(false);
                setSnackBarState(true);
            }

        }

    }, []);

    return null;
}

export default Websocket;