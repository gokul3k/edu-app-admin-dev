import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeFeatureCard from '../../../components/cards/HomeFeatureCard'
import {useSelector} from 'react-redux'
import cardBg1 from "assets/images/card_bg1.svg";
import cardBg2 from "assets/images/card_bg2.svg";
import cardBg3 from "assets/images/card_bg3.svg";
import cardBg4 from "assets/images/card_bg4.svg";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    display:"flex",
    flexWrap:"wrap",
    flexDirection:"row",
    flexGrow: 1,
    justifyContent:'space-evenly',
    padding:"24px",
    alignItems:"center",
  }
  });
  
export default function Features({history}) {
    const classes = useStyles();
    const userRole = useSelector((state) => state.userRole);
    const { roles } = userRole;
  //  try {
    const features = [{
      bgColor: "#e63946",
      url: cardBg1,
      title:"Student Enrolment",
      link:'/app/students',
      show:roles.ENROLLMENTS? (!!roles.ENROLLMENTS.ALL_STUDENTS):false
    },
    {
      bgColor: "#a8dadc",
      url: cardBg2,
      title:"Adverisement Board",
      link:'/app/ad',
      show:roles.ENROLLMENTS?(!!roles.ENROLLMENTS.ADVERTISEMENTS):false
    },
    {
      bgColor: "#457b9d",
      url: cardBg3,
      title:"Manage Users",
      link:'/app/users',
      show:roles.USER_ACCESS?!!roles.USER_ACCESS.ALL_USERS:false
    },
    {
      bgColor: "#1d3557",
      url: cardBg4,
      title:" Exams",
      link:'/app/exams',
      show:roles.EXAMS_LISTING? !!roles.EXAMS_LISTING.ALL_EXAMS :false

    },
  ]
  //  } catch (error) {
  //    console.log(error);
  //  }
    return (
        <div className={classes.root}>
        {console.log(features,"ne")}
        {
          features.map((item)=>{
            if(item.show)
          return <HomeFeatureCard key={item.title} img={item.url} title={item.title} link={item.link} history={history} bgColor={item.bgColor}/>

          })
        }
        </div>
    )
}
