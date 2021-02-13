import React, { useState } from "react";
import XLSX from "xlsx";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const useStyles = makeStyles((theme) => ({
  root: {

  },
  input: {
    display: "none",
  },
  btn:{
    backgroundColor:"#388e3c",
    color:"white",
    borderColor: '#388e3c',
    fontSize:".8rem",
    '&:hover': {
        backgroundColor: 'white',
        color:"#388e3c",
        borderColor: '#388e3c',
      },
      '&:active': {
        backgroundColor: 'white',
        color:"#388e3c",
        borderColor: '#388e3c',
      },
      "& .MuiTouchRipple-root span":{
        backgroundColor: 'grey!important',
        opacity: .3,
      },
  },
}));
export default function ExcelReader({setData}) {
  const classes = useStyles();
  const [cols, setCols] = useState([]);

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) {

      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onload = (e) => {
        /* Parse data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true,
        });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws);
        /* Update state */
        setData(data)
        setCols(make_cols(ws["!ref"]));
      };
      try {
        if (rABS) {
          reader.readAsBinaryString(files[0]);
        } else {
          reader.readAsArrayBuffer(files[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };



  return (
    <div className={classes.root}>
      <input
        accept="xlsx/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file">
        <Button size="small" variant="contained" className={classes.btn} component="span" startIcon={<CloudUploadIcon />}>
          Upload
        </Button>
      </label>
    </div>
  );
}

const make_cols = (refstr) => {
  let o = [],
    C = XLSX.utils.decode_range(refstr).e.c + 1;
  for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
  return o;
};
