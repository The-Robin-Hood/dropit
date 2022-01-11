import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LinearProgressWithLabel from '../Hooks/LinearProgress';
import { Typography } from '@material-ui/core';

const SendFilePopup = ({fileDetails,mode}) => {
    return (
        <div><Dialog open={true} >
            <DialogTitle  style={{color:(mode==='light')?"black":"skyblue",backgroundColor: (mode==='light')?"white":"black"}}>File Sending</DialogTitle>
            <DialogContent style={{ maxWidth: "500px", minWidth: (window.visualViewport.width > 600 ) ?"400px": "230px", overflowWrap: "break-word",color:(mode==='light')?"black":"skyblue",backgroundColor: (mode==='light')?"white":"black"}}>
               
                {(fileDetails.progress !== 100) && <div> <Typography>{fileDetails.name}</Typography>
                    <LinearProgressWithLabel value={Number(fileDetails.progress)} mode={mode} /> </div>
                }

            </DialogContent>
        </Dialog>
        </div>
    );
}
 
export default SendFilePopup;