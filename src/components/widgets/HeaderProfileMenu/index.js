import React,{useState} from "react";
import {
    Menu,
    MenuItem,
    IconButton,

  } from "@material-ui/core";
  import {
    Person as AccountIcon,
  } from "@material-ui/icons";
  import classNames from "classnames";
  import useStyles from "./styles";

  import {  Typography } from "../../Wrappers/Wrappers";
import { getUserInfo } from "../../../services/userService/userInfo";

export default function HeaderProfileMenu({logoutClicked}) {
    var classes = useStyles();
    var [profileMenu, setProfileMenu] = useState(null);
    const user = getUserInfo()

  return (
    <div>
          <IconButton
          aria-haspopup="true"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon style={{color:"white"}} classes={{ root: classes.headerIcon }} />
        </IconButton>
           <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {user.name?user.name.charAt(0).toUpperCase()+user.name.slice(1):""}
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="primary"
            >
             {user.email}
            </Typography>
          </div>
          {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem> */}
          {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem> */}
          {/* <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem> */}
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="secondary"
              onClick={logoutClicked}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
    </div>
  );
}
