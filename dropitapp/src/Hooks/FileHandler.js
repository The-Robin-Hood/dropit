var filesQueue = [];
var fileCount = 0;
const sendFile = (conn, file,userId) => {    
    var chunksize = 1e6;
    let offset = 0;
    const fileReader = new FileReader();
    fileReader.addEventListener('load', e => {
        conn.send({
            buffer: e.target.result,
            filename: file.name,
            filetype: file.type,
            filesize: file.size,
            filecount: fileCount,
            senderId : userId,
        });
        offset += e.target.result.byteLength;
        if (offset < file.size) {
            readSlice(offset);
        }
        else {
            if (filesQueue.length > 0) {
                sendFile(conn,filesQueue.shift(),userId);
            }
        }
    });
    const readSlice = o => {
        const slice = file.slice(offset, o + chunksize);
        fileReader.readAsArrayBuffer(slice);
    };
    readSlice(0);

}

const FileTransfer = (peer, remotePeer, files,userId) => {
    fileCount = files.length;
    const conn = peer.current.connect(remotePeer);
    for (let i = 0; i < files.length; i++) {
        filesQueue.push(files[i]);
    }
    conn.on('open', () => {
        sendFile(conn,filesQueue.shift(),userId);
    });

}

export default FileTransfer;