import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function StudentListMenu({
  goToMail,
  assignStudents
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        disableElevation
        size="small"
      >
        Action
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        elevation={0}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center", 
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MenuItem
          onClick={() => {
            goToMail()
            handleClose();
          }}
        >
          Send email
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            assignStudents()
            handleClose();
          }}
        >
          Assign students
        </MenuItem> */}
      </Menu>
    </div>
  );
}
