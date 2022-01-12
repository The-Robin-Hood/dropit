import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import QrCodeScanner from '@mui/icons-material/QrCodeScanner';
import GitHubIcon from '@material-ui/icons/GitHub';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import OpacityIcon from '@material-ui/icons/Opacity';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import InstagramIcon from '@mui/icons-material/Instagram';


const useStyles = mode => makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: 0,
            marginLeft:"20px",
            "&:hover": {
                backgroundColor: "transparent",
            },
            "@media (max-width:600px)": {
                marginLeft:"0px",
            }
        },
        title: {
            fontFamily: "Righteous",
            flexGrow: 1,
            fontSize: "40px",
            color: "#3BA5C9",
            "@media (max-width:600px)": {
                fontSize: "30px",
            },
        },
        titleicon: {
            color: "#3BA5C9",
            padding: "0px 0px 0px 10px",
            fontSize: "25px",
            "@media (max-width:600px)": {
                padding: "0px 0px 0px 5px",
                fontSize: "20px",
            }
        },
        AppBar: {
            backgroundColor: (mode ==="light")?"#F0F0F0" : "#111111",
            minHeight: 70,
            "@media (max-width:600px)": {
                minHeight: 50,
            }
        },
        NavIcon: {
            color: (mode === "light") ? "#3D5462" : "#3BA5C9",
            maxHeight: "50px",
            maxWidth: "50px",
            minHeight: "35px",
            minWidth: "35px",
            "@media (max-width:600px)": {
                maxHeight: "30px",
                maxWidth: "30px",
                minHeight: "20px",
                minWidth: "20px",
            },
        }
    }));


const TopBar = ({mode,handleMode,setOpenQr}) => {
    const classes = useStyles(mode)();
    return (
        <div className={classes.root}>
            <AppBar className={classes.AppBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Drop It
                        <OpacityIcon className={classes.titleicon} />
                    </Typography>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>setOpenQr(true)}>
                        <QrCodeScanner className={classes.NavIcon} />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} onClick={()=> handleMode()  } color="inherit" aria-label="menu">
                       { (mode === "light") ? <NightsStayIcon className={classes.NavIcon} /> : <Brightness7Icon className={classes.NavIcon} /> }
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} onClick={()=>  window.open("https://github.com/The-Robin-Hood") }  color="inherit" aria-label="menu">
                        <GitHubIcon className={classes.NavIcon} />
                    </IconButton>
                    <IconButton edge="start" className={classes.menuButton} onClick={()=>  window.open("https://instagram.com/the_robin_hood") }  color="inherit" aria-label="menu">
                        <InstagramIcon className={classes.NavIcon} />
                    </IconButton>
                    
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    );
}
 
export default TopBar;