import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root:{
    margin:16,
  },
  image: {
    position: 'relative',
    borderRadius:25,
    height:250,
    // [theme.breakpoints.down('sm')]: {
    //   width: '100% !important', // Overrides inline-style
    //   height: 100,
    // },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      }
    },
  },
  focusVisible: {},
  imageButton: {
    borderRadius:25,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    borderRadius:25,
  },
  imageBackdrop: {
    position: 'absolute',
    borderRadius:25,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    fontSize:18,
    fontWeight:800,
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));
export default function HomeFeatureCard({img,link,title,history, bgColor}) {
  const classes = useStyles();

  return (
   <div className={classes.root}>
        <ButtonBase
          focusRipple
          key={title}
          className={classes.image}
          onClick={()=>history.push(link)}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: 400,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${img})`,
            }}
          />
          {/* <span className={classes.imageBackdrop} /> */}
          <span className={classes.imageButton}>
            {/* <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {title}
              <span className={classes.imageMarked} />
            </Typography> */}
          </span>
        </ButtonBase>
   </div>
  );
}
