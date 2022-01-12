import QRCode from 'qrcode'
import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    content: {
        height: (window.visualViewport.width > 600) ? "400px" : "330px",
        width: (window.visualViewport.width > 600) ? "300px" : "240px",
    },
    imgsize:{
        height: (window.visualViewport.width > 600) ? "300px" : "250",
        width: (window.visualViewport.width > 600) ? "300px" : "250px",
    }
}));
const QrCodeGenerator = ({ peerId, openQr, setOpenQr }) => {
    const [imgurl, setimgurl] = useState('');
    useEffect(() => {
        QRCode.toDataURL(peerId)
            .then(url => {
                setimgurl(url);
            })
            .catch(err => {
                console.error(err)
            })
    }, [peerId])

    const classes = useStyles();
    return (
        <Dialog open={openQr} onClose={() => setOpenQr(false)}>
            <DialogContent className={classes.content}>
                {imgurl && <img className={classes.imgsize} src={imgurl} alt="QR Code" />}
                <Typography style={{ fontFamily: "'Spline Sans', sans-serif" }} variant="h5" align="center">Scan this QR Code to transfer files.</Typography>

            </DialogContent>
        </Dialog>
    );
}

export default QrCodeGenerator;