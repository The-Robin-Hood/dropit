import { Avatar, Button, Icon, IconButton, makeStyles, Typography } from "@material-ui/core";
import "../styles/HomePage.css";
import AndroidOutlinedIcon from '@material-ui/icons/AndroidOutlined';
import AppleIcon from '@mui/icons-material/Apple';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import "../styles/Animation.css";
import { useRef } from "react";


const useStyles = mode => makeStyles((theme) => ({
    Avatar: {
        background: mode === "light" ? 'linear-gradient(246.38deg, #3195B7 -30.9%, rgba(141, 226, 255, 0) 117.87%)' : ' linear-gradient(247.55deg, #3195B7 -0.79%, rgba(141, 226, 255, 0) 118.5%)',
        fontSize: "40px",
        height: "75px",
        width: "75px",
        "@media (max-width: 600px)": {
            fontSize: "30px",
            height: "50px",
            width: "50px",
        },
    },
    AvatarIcon: {
        color: (mode === "light") ? "#618093" : "#3BA5C9",
        height: "40px",
        width: "40px",
        "@media (max-width: 600px)": {
            height: "30px",
            width: "30px",
        },
    },

    DeviceTitle: {
        color: (mode === "light") ? "#618093" : "#3BA5C9",
        fontSize: "20px",
        fontFamily: "Righteous",
        paddingTop: "10px",
        "@media (max-width: 600px)": {
            fontSize: "15px",
            paddingTop: "5px",
        },
        maxWidth: "200px",

    },

    DeviceSubtitle: {
        color: (mode === "light") ? "#618093" : "#3BA5C9",
        fontSize: "11px",
        fontFamily: "Catamaran",
        fontWeight: "light",
        paddingTop: "1px",
        "@media (max-width: 600px)": {
            fontSize: "7px",
            paddingTop: "0px",
            fontWeight: "light",

        },
        maxWidth: "200px",

    },
    btn: {
        backgroundColor: "transparent",
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    scanBtn: {
        position: "absolute",
        bottom: "10px",
        right: "10px",
        backgroundColor: "lightblue",
        color:"#618093",
        "&:hover": {
            backgroundColor: "lightblue",
        },

    }
}));

const Body = ({ mode, deviceName, Clients, handleFileTransfer }) => {
    const userDevice = () => {
        if (navigator.userAgent.indexOf("Mac") !== -1) {
            return <AppleIcon className={classes.AvatarIcon} />
        }
        if (navigator.userAgent.indexOf("Android") !== -1) {
            return <AndroidOutlinedIcon className={classes.AvatarIcon} />
        }
        if (navigator.userAgent.indexOf("Win") !== -1 || navigator.userAgent.indexOf("Linux") !== -1) {
            return <DesktopMacIcon className={classes.AvatarIcon} />
        }
    }

    const handleClientPositonStyle = (index) => {
        var values = {}
        var devicewidth = window.visualViewport.width;
        if (devicewidth < 600) {
            switch (index) {
                case 0:
                    values = {
                        left: "50px",
                        top: "200px",
                    }
                    break;
                case 1:
                    values = {
                        right: "50px",
                        top: "200px",
                    }
                    break;
                case 2:
                    values = {
                        left: "50px",
                        bottom: "200px",
                    }
                    break;
                case 3:
                    values = {
                        right: "50px",
                        bottom: "200px",
                    }
                    break;
                case 4:
                    values = {
                        bottom: "50px",
                    }
                    break;
                default:
                    values = {
                        top: "100px",
                    }
            }
        }
        else {
            switch (index) {
                case 0:
                    values = {
                        left: "500px",
                        top: "200px",
                    }
                    break;
                case 1:
                    values = {
                        right: "500px",
                        top: "200px",
                    }
                    break;
                case 2:
                    values = {
                        left: "500px",
                        bottom: "200px",
                    }
                    break;
                case 3:
                    values = {
                        right: "500px",
                        bottom: "200px",
                    }
                    break;
                case 4:
                    values = {
                        bottom: "100px",
                    }
                    break;
                default:
                    values = {
                        top: "100px",
                    }
            }

        }

        return values;
    }


    const classes = useStyles(mode)();
    const fileInput = useRef();
    return (
        <div className="Body" style={mode === "dark" ? { backgroundColor: "black" } : {}}>

            <div className="BodyContent">
                <div className="wrapper">
                    <div className="radar">
                        <div className="radar-wave"></div>
                        <div className="radar-wave"></div>
                        <div className="radar-wave"></div>
                        <div className="radar-wave"></div>
                        <div className="radar-wave"></div>
                    </div>
                </div>
                <div className="User">
                    <Avatar className={classes.Avatar}>
                        {userDevice()}
                    </Avatar>
                    <Typography variant="h5" className={classes.DeviceTitle}> {deviceName} </Typography>
                </div>

                {Clients.map((client, index) => {

                    return (
                        <div className="Client popout" style={handleClientPositonStyle(index)} key={index}>
                            <input
                                ref={fileInput}
                                type="file"
                                accept="*"
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                multiple
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        handleFileTransfer(client.peer, e.target.files);
                                    }
                                }}
                            />
                            <Button className={classes.btn} disableRipple onClick={() => fileInput.current.click()}>
                                <Avatar className={classes.Avatar}>
                                    {(client.name.os === "Android") && <AndroidOutlinedIcon className={classes.AvatarIcon} />}
                                    {(client.name.os === "iOS") && <AppleIcon fontSize="large" className={classes.AvatarIcon} />}
                                    {((client.name.os === "Linux") || (client.name.os === "Windows")) && <DesktopMacIcon style={{ fontSize: 30 }} className={classes.AvatarIcon} />}
                                </Avatar>
                            </Button>
                            <Typography variant="h5" className={classes.DeviceTitle}> {client.name.displayName} </Typography>
                            <Typography variant="subtitle1" className={classes.DeviceSubtitle}> {client.name.model} </Typography>

                        </div>


                    );

                })
                }

                <IconButton className={classes.scanBtn} onClick={() => { console.log("clicked") }}>
                    <DocumentScannerOutlinedIcon style={{ fontSize: 30 }} />
                </IconButton>

            </div>
        </div>
    );
}

export default Body;