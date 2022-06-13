import * as React from 'react';
import { useCallback } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import {Buffer} from 'buffer';
import { styled } from '@mui/material/styles';


import { Alert, AlertTitle, Button, Card, CircularProgress, Grid, LinearProgress, Stack, TextField } from '@mui/material';
import { StateContext } from '../context/context';


const style = {
  modal: {
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
  },
};

export default function Payment(prop) {
  const [type, setType] = React.useState("Table payment");
  const [pic, setpic] = React.useState("")
  const [remark, setRemark] = React.useState("")
  const [imgSrc, setimgSrc] = React.useState("")
 const { token,setObj } = React.useContext(StateContext)
 let handleNext = prop.next
 let id = prop.user
  const handleModalNext = React.useCallback(() => {
    handleNext()
  }, [handleNext])


  const imgPreview = (e) => {
    getBase64(e.target.files[0])
    
  }

  const Input = styled('input')({
    display: 'block',
  });
  const methodList = [
    "Table payment",
    "Bank Transfer",
    "POS",
    "Mobile Money /Wallet Transfer",
    "Connect to payment API"

  ]
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setimgSrc(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 

  const updateBio = () => {
    console.log(id)

    let data = {
        methodOfPayment: type,
        remark,
        amount: 20000,
        imagePath:imgSrc
    }
    setObj("payment",data,id)
    handleModalNext()
  }


  React.useEffect(() => {


  }, [])

  return(
  < Box container sx={style.modal} >
      <Grid alignItems="center" justifyContent="center" gap={1} container >
        <Grid sm={5} item >
          <TextField
            select
            label="Method of Payment"
            value={type}
            onChange={(e) => setType(e.target.value)}
            size='small'
            SelectProps={{
              native: true,
            }}
          >
            {methodList.map((option) => (
              <option key={option.value} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid sx={{ mb: 3 }} sm={6} item >
          <label htmlFor="contained-button-file">
            <span style={{ fontSize: "12px" }} >proof of payment</span>
            <Input onChange={(e) => imgPreview(e)} id="contained-button-file" type="file" />
          </label>
        </Grid>
        <Grid sm={12} item >
          {type==="Connect to payment API" ? <Stack sx={{ color: 'grey.500',alignItems: "center"}} spacing={2}>
            <p>Searching for third-party payment Interface</p>
            <CircularProgress color="secondary" /></Stack> : <img src={imgSrc} id="preview" width="100%" height="250" />
            }
        </Grid>
        <Grid sm={12} item >
          <TextField onChange={(e) => setRemark(e.target.value)} fullWidth size="small" label="Remarks" multiline />
        </Grid>
        {/* <Grid item >
           <label htmlFor="contained-button-file">
<Input accept="image/*" id="contained-button-file" multiple type="file" />
<Button variant="contained" component="span">
  Upload
</Button>
</label>
        </Grid>
        <Grid item >
            <TextField size="small" defaultValue="Soba" label="LGA" />
        </Grid>
        <Grid item >
            <TextField size="small" defaultValue="07055793353" label="Phone Number" />
        </Grid>
        <Grid item >
            <TextField size="small" defaultValue="Trader" label="Occupation" />
        </Grid>
        <Grid item >
            <TextField size="small" defaultValue="Abou jere" label="Next of Kin" />
        </Grid>
        <Grid item >
            <TextField size="small" defaultValue="Brother" label="Next of Kin RelationShip" />
        </Grid>
        <Grid item >
            <TextField size="small" defaultValue="08033093978" label="Next of Kin Phone" />
        </Grid>
        <Grid item >
            <TextField size="small" defaultValue="123456532" label="ID Type" />
        </Grid>
        <Grid item >
            <TextField size="small" defaultValue="123456532" label="ID Number" />
        </Grid> */}
      </Grid>
      <Button  onClick={updateBio}  size="small" disableElevation sx={{width:200,marginTop:8, marginLeft:"28%"}} variant='contained' fullWidth={true}  color="primary" >Send</Button>
  </Box >
  )
}
