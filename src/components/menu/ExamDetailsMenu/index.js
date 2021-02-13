import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function SimpleMenu({
  onEditClicked,
  onDisableClicked,
  onDeleteClicked,
  onAssignClicked,
  onUpdateQuestionsClicked,
  onReplaceQuestionsClicked,
  disabled
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
            onEditClicked();
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDisableClicked();
            handleClose();
          }}
        >
         { disabled?"Disable":"Enable"}
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            onDeleteClicked();
            handleClose();
          }}
        >
          Delete
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            onAssignClicked();
            handleClose();
          }}
        >
          Assign Students
        </MenuItem>
        <MenuItem
          onClick={() => {
            onUpdateQuestionsClicked();
            handleClose();
          }}
        >
         Update questions
        </MenuItem>
        <MenuItem
          onClick={() => {
            onReplaceQuestionsClicked();
            handleClose();
          }}
        >
         Replace questions
        </MenuItem>
      </Menu>
    </div>
  );
}
