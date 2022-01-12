import "../styles/HomePage.css";
import TopBar from "./Navbar";
import { useState, useRef, useEffect } from "react";
import Body from "./MainBody";
import Popup from './Popup'
import Websocket from "../Hooks/Websocket";
import QrCodeGenerator from "../Hooks/QrCode";
import FileTransfer from "../Hooks/FileHandler";
import ReceiveFilePopup from "./ReceiveFilePopup";
import SendFilePopup from "./SendFilePopup";
import { Alert, Snackbar } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import QRScanner from "../Hooks/Scanner";


const HomePage = () => {
    const [mode, setMode] = useState(window.localStorage.getItem('Mode') || 'light');
    const [userName, setuserName] = useState(window.localStorage.getItem('dropit-deviceName') || '');
    const [userId, setuserId] = useState('');
    const [Clients, setClients] = useState([]);
    const [peerId, setpeerId] = useState('');
    const [openQr, setOpenQr] = useState(false);
    const [recievefileDetails, setRecieveFileDetails] = useState({});
    const [sendfileDetails, setSendFileDetails] = useState({});
    const [sending, setSending] = useState(false);
    const [receiving, setReceiving] = useState(false);
    const [fileQueue, setfileQueue] = useState([]);
    const [snackBarState, setSnackBarState] = useState(false);
    const [errorBarState, setErrorBarState] = useState(false);
    const [QrButtonClick,setQrButtonClick] = useState(false);

    const ws = useRef();
    const peer = useRef();

    const handleMode = () => {
        if (mode === "light") {
            setMode("dark");
            window.localStorage.setItem('Mode', 'dark');
        } else {
            setMode("light");
            window.localStorage.setItem('Mode', 'light');
        }
    }

    const handleFileTransferClick = (remotePeer, files) => {
        FileTransfer(peer, remotePeer, files, userId);
    };

    const handleSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarState(false);
        setErrorBarState(false);
    };

    useEffect(() => {
        if (recievefileDetails.progress === 100) {
            setfileQueue((oldArray) => [...oldArray, recievefileDetails]);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recievefileDetails.progress]);

    return (
        <div className="HomePage">
            <Popup Name={userName} peerId={peerId} setName={setuserName} ws={ws} />
            <TopBar mode={mode} handleMode={handleMode} setOpenQr={setOpenQr}></TopBar>
            <Body mode={mode} deviceName={userName} Clients={Clients} handleFileTransfer={handleFileTransferClick} setQrButtonClick={setQrButtonClick} setErrorBarState={setErrorBarState} />
            <Websocket ws={ws} peer={peer} setpeerId={setpeerId} Clients={Clients} setClients={setClients} setReceiving={setReceiving} setSending={setSending} setFileDetails={setRecieveFileDetails} setuserId={setuserId} setSnackBarState={setSnackBarState} setSendFileDetails={setSendFileDetails} />
            {peerId && (!receiving) && (!sending) && <QrCodeGenerator peerId={peerId} openQr={openQr} setOpenQr={setOpenQr} />}
            {receiving && <ReceiveFilePopup mode={mode} setReceiving={setReceiving} fileDetails={recievefileDetails} fileQueue={fileQueue} setfileQueue={setfileQueue} />}
            {sending && <SendFilePopup mode={mode} fileDetails={sendfileDetails} />}
            <Snackbar open={snackBarState} onClose={handleSnackBar} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert icon={<CheckCircleOutlineIcon fontSize="inherit" style={{ color: "white" }} />} sx={{ width: '100%' }} style={{ backgroundColor: "skyblue", color: "white" }}>
                    File Transfer Complete !!
                </Alert>
            </Snackbar>
            <Snackbar open={errorBarState} onClose={handleSnackBar} autoHideDuration={3000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert icon={<ErrorOutlineIcon fontSize="inherit" style={{ color: "white" }} />} sx={{ width: '100%' }} style={{ backgroundColor: "red", color: "white" }}>
                    Required Camera Permission !!
                </Alert>
            </Snackbar>
            {QrButtonClick && <QRScanner setQrButtonClick={setQrButtonClick} handleFileTransfer={handleFileTransferClick} />}
        </div>

    );
}

export default HomePage;