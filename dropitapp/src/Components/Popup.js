import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';


import { useState } from 'react';

const Popup = ({Name,setName,ws,peerId}) => {
    const [open,setOpen] = useState(true);
    return (
         <div><Dialog
        open={open}>
        <DialogTitle> Set your Name </DialogTitle>
        <DialogContent>
                
            <TextField className="Name"
                autoFocus
                margin="dense"
                value={Name}
                type="text"
                fullWidth
                onChange={(e) => {
                    setName(e.target.value);
                }}

            />
            <Button onClick={() => {
                if ((Name !=="") && (peerId !== "")) {
                    window.localStorage.setItem('dropit-deviceName', Name);
                    ws.current.send(JSON.stringify({ mode: 'Join', name: Name , peer:peerId}));
                    setOpen(false);
                }
                else if (Name !=="") {
                    setTimeout( ws.current.send(JSON.stringify({ mode: 'Join', name: Name , peer:peerId})), 3000);
                    setOpen(false);
                }
                
            }
            }> Set </Button>
        </DialogContent>
    </Dialog> 
    </div>
    );
}
 
export default Popup;