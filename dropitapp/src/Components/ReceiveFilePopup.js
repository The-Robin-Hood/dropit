import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import LinearProgressWithLabel from '../Hooks/LinearProgress';
import { Typography } from '@material-ui/core';

const ReceiveFilePopup = ({ fileDetails, setReceiving, fileQueue, setfileQueue,mode }) => {
    const handleCancel = () => {
        setfileQueue([]);
        setReceiving(false);
        
    };

    const handleSave = () => {
        fileQueue.forEach(file => {
            const received = new Blob(file.receiveBuffer);
            const url = URL.createObjectURL(received);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();
        }
        );
        setfileQueue([]);
        setReceiving(false);    
    };
    return (
        <div><Dialog open={true} >
            <DialogTitle  style={{color:(mode==='light')?"black":"skyblue",backgroundColor: (mode==='light')?"white":"black"}}>File Receiving</DialogTitle>
            <DialogContent style={{ maxWidth: "500px", minWidth: (window.visualViewport.width > 600 ) ?"400px": "230px", overflowWrap: "break-word",color:(mode==='light')?"black":"skyblue",backgroundColor: (mode==='light')?"white":"black"}}>
                {(fileQueue !== []) &&
                    fileQueue.map((file, index) => {
                        return (
                            <div key={index}>
                                <Typography>{file.name}</Typography>
                                <Typography style={{ fontSize: 13, marginBottom: 10 }}>{(file.size>1000*1000)? Math.round(Number(file.size)/1e+6)+" MB" : Math.round(Number(file.size)/1000)+" KB"}</Typography>
                            </div>
                        )
                    })
                }
                {(fileDetails.progress !== 100) && <div> <Typography>{fileDetails.name}</Typography>
                    <LinearProgressWithLabel value={Number(fileDetails.progress)} mode={mode} /> </div>
                }
                {(fileDetails.progress === 100) &&
                    <div>
                        <Button onClick={()=> handleSave()} variant="contained" style={{ margin: 15, position: "absolute", right: 30, backgroundColor: "skyblue" }}>
                            Save
                        </Button> <Button onClick={() => handleCancel()} variant="text" style={{ margin: 15, color: "skyblue" }}>
                            Cancel
                        </Button>
                    </div>}

            </DialogContent>
        </Dialog>
        </div>
    );
}

export default ReceiveFilePopup;