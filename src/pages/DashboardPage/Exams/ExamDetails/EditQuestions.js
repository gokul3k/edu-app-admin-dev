import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExcelReader from "components/buttons/ExcelReader";
import QuestionListItem from 'components/list/QuestionListItem';
import api from 'api/api'
import {getCredentials} from 'services/authService'

export default function EditQuestions({handleSubmit,open,handleClose,update,data,setData}) {
   

  return (
    <div>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth maxWidth="lg">
    <DialogTitle id="form-dialog-title">{update? "Update Questions":"Replace Questions"}</DialogTitle>
        <DialogContent style={{scrollbarWidth:"thin",scrollbarColor:"blue"}}>
          <DialogContentText>
         {update?" Do not update with previously added questions. Only add fresh set of questions !!":"Replace exisiting questions with a new one."}
          </DialogContentText>
          <ExcelReader setData={setData} />
          
        {data.map((item, index) => (
          <QuestionListItem
            item={item}
            // onEdit={onEdit}
            // onDelete={onDelete}  
            index={index}
            edit={false}
          />
        ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{handleClose();setData([]);}} color="primary">
            Cancel
          </Button>
          <Button onClick={()=>{handleSubmit()}} color="primary">
          {update? "Update":"Replace"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}