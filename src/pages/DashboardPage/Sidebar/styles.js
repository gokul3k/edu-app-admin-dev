import { makeStyles } from "@material-ui/styles";
const drawerWidth = 240;

export default makeStyles((theme) => ({

    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    menuButton: {
      color:"#bfbfbf"
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      background: theme.palette.primary.nav,
      // background: "-webkit-linear-gradient(to bottom, #000428, #004e92)",
      // background: "linear-gradient(to bottom, #000428, #004e92)",
      
      backgroundImage:"url(/assets/images/nav_bg_img.png)",
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    listHeading:{
      fontSize:"1rem",
      paddingLeft:18,
      color:"white",
      fontWeight:700
    }
  }));