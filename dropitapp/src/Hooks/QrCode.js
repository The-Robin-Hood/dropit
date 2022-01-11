import QRCode from 'qrcode'
import { useEffect,useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    content:{
        height: '400px',
        width: '300px',
    }
}));
const QrCodeGenerator = ({peerId,openQr,setOpenQr}) => {
    const [imgurl,setimgurl] = useState('');
    useEffect(() => {
        QRCode.toDataURL(peerId)
        .then(url => {
            setimgurl(url);
        })
        .catch(err => {
            console.error(err)
        })
    }, [])
    
        const classes = useStyles();
    return (
         <div><Dialog open={openQr} onClose={()=>setOpenQr(false)}>
        <DialogContent className={classes.content}>
            {imgurl && <img style={{height:"300px",width:"300px"}} src={imgurl} alt="QR Code" />}
        <Typography style={{fontFamily:"'Spline Sans', sans-serif"}} variant="h5" align="center">Scan this QR Code to transfer files.</Typography>
                   
        </DialogContent>
    </Dialog> 
    </div>
);
    }

export default QrCodeGenerator;