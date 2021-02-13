
import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { enrolmentsList, examsList,userListItems } from "./listItems";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import List from "@material-ui/core/List";
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link as RLLink  } from "react-router-dom";
import useStyles from "./styles";
import MenuIcon from "@material-ui/icons/Menu";

export default function Sidebar({handleDrawerClose,open,roles,handleDrawerOpen}) {

    const classes = useStyles();
    if(roles)
    return (
        <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
       { open? (<div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose} className={classes.menuButton}>
            <ChevronLeftIcon />
          </IconButton>
        </div>):(
          <IconButton
            edge="start"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Divider />
        <ListItem button  component={'/app/dashboard' && RLLink} to='/app/dashboard'>
          <ListItemIcon>
            <DashboardIcon className={classes.menuButton}/>
          </ListItemIcon>
          <ListItemText primary="Overview" className={classes.menuButton}/>
        </ListItem>
       {
         roles.ENROLLMENTS &&(<div>
         <Divider />
        <List>{enrolmentsList(roles.ENROLLMENTS,classes,open)}</List>
         </div>
         )}
       {
        roles.USER_ACCESS &&(<div>
         <Divider />
        <List>{userListItems(roles.USER_ACCESS,classes,open)}</List>
         </div>
         )}
       {
         roles.EXAMS_LISTING &&(<div>
         <Divider />
        <List>{examsList(roles.EXAMS_LISTING,classes,open)}</List>
         </div>
         )}
        {roles.ADMIN_SETTINGS&&(<ListItem button  component={'/app/settings' && RLLink} to='/app/settings'>
          <ListItemIcon>
            <SettingsIcon className={classes.menuButton}/>
          </ListItemIcon>
          <ListItemText primary="Settings"className={classes.menuButton}/>
        </ListItem>)}
      </Drawer>
    )
    else return (
      <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={true}
    >
    
    </Drawer>
  )
}
