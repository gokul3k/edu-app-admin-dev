import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
    root: { 
        marginTop:32
    },
    avatar: {
      width: 150,
      height: 150,
    },
    paper:{
        padding:32,
        width:"100%"
    },
    divider:{
        margin:16
    },
    fullName:{
        color:theme.palette.primary.light,
        fontSize:22,
    },
    phone:{
        color:theme.palette.text.secondary,
        fontSize:16,
    },
    email:{
        color:theme.palette.text.secondary,
        fontSize:16,
    },
    id:{
        color:theme.palette.text.primary,
        fontSize:16,
    },
    label:{
        color:theme.palette.secondary.light,
        marginRight:4,
    }
  }));
  