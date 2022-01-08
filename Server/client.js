const parser = require('ua-parser-js');
module.exports = class Client{
    constructor(socket,request)
    {
        this.socket = socket;
        this.setIP(request);
        this.setID(request);
        this.setName(request);
        this.rtcSupport = request.url.indexOf('webrtc') > -1;
        this.heartBeat = Date.now();
        this.timerId =0;    
    }

    setIP(request)
    {
        if (request.headers['x-forwarded-for']) {   
            this.ip = request.headers['x-forwarded-for'].split(/\s*,\s*/)[0];
        } else {
            this.ip = request.connection.remoteAddress;
        }

        if (this.ip == '::1' || this.ip.includes('::ffff')) {
            this.ip = '127.0.0.1';
        }

    }

    setID(request)
    {
        if (request.peerId) {
            this.id = request.peerId;
        } else {
            console.log(request.headers.cookie);
            this.id = request.headers.cookie.replace('peerid=', '');
        }
    }
    
    setName(request)
    {
        let ua = parser(request.headers['user-agent']);


        let deviceName = '';
        
        if (ua.os && ua.os.name) {
            deviceName = ua.os.name.replace('Mac OS', 'Mac') + ' ';
        }
        
        if (ua.device.model) {
            deviceName += ua.device.model;
        } else {
            deviceName += ua.browser.name;
        }

        if(!deviceName)
            deviceName = 'Unknown Device';

        const displayName = deviceName + ' (' + this.ip + ')';

        this.name = {
            model: ua.device.model,
            os: ua.os.name,
            browser: ua.browser.name,
            type: ua.device.type,
            deviceName,
            displayName
        };
        
    }

    printClientInfo() {
        console.log(`Client id=${this.id} ip=${this.ip} rtcSupported=${this.rtcSupport}`);
    }

    fetchDetails()
    {
        return {
            id: this.id,
            ip: this.ip,
            name: this.name,
            peer : this.peer,
        }
    }

}   
