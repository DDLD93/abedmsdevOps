import * as React from 'react';
import { useCallback } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import MDButton from 'components/MDButton';
import photo from '../../assets/logo/avatar.png'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import config from "../../config"


import "./style.css"
import { Alert, AlertTitle, Button, Card, CircularProgress, Grid, LinearProgress, Stack, TextField } from '@mui/material';
import Success from 'layouts/beneficiaries/success';
import { StateContext } from 'store/store';


const style = {
  modal: {
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: "95%",
    bgcolor: 'background.paper',
    justifyContent: "flex-start",

    pt: 0,
    pb: 5,
    pr: 2,
    pl: 2
  },
  card: {
    display: "flex",
    gap: 3,
    width: "100%",
    justifyContent: "flex-start"
  }
};

export default function PaymentMethod({ handleNext, id, clientName, photo, status }) {
  const [type, setType] = React.useState(null);
  const [remark, setRemark] = React.useState("")
  const [imgSrc, setimgSrc] = React.useState("")
  const { token } = React.useContext(StateContext)
  const handleModalNext = React.useCallback(() => {
    handleNext()
  }, [handleNext])


  const { updateObject, notification } = React.useContext(StateContext)
  const imgPreview = (e) => {
    let obj = window.URL.createObjectURL(e.target.files[0])
    setimgSrc(obj)
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

  const updateBio = () => {

    let data = {
      payment: {
        methodOfPayment: type,
        remark,
        amount: 20000,
        imagePath: imgSrc,
      },
    }
    updateObject(data)
    handleModalNext()

    //  let url = `${config.EndPionts}/beneficiaries/payment/${id}`
    // fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Authorization": "Bearer "+ token,
    // },
    //   body: form
    // }).then(res => (res.json())).
    //   then(res => {
    //     console.log(res)
    //     notification("success", "Payment successfull")
    //     handleModalClose()
    //   }).
    //   catch(err => console.log("error >>>>> ", err))
  }


  React.useEffect(() => {


  }, [])

  return(
  < Box container sx={style.modal} >
    <Typography mb={7} textAlign="center" variant="h5" component="h6">
      {"Payment Information"}
    </Typography>
    <Grid justifyContent="flex-start" wrap="nowrap" flexDirection="row-reverse" container >
      <Card sx={{ width: 250, height: 270, p: 2 }}>
        <img style={{ borderRadius: "50%", marginBottom: "10px" }} src={`https://localhost:9000/api/${photo}`} alt="avatar" width="150" height="150" />
        <p style={{ fontSize: "10px", textAlign: "start" }} ><span style={{ fontWeight: "bolder" }} >Name</span>: {clientName}</p>
        <p style={{ fontSize: "10px" }} ><span style={{ fontWeight: "bolder" }} >Status</span>: <em style={{ color: "#f99700" }} >{status}</em> </p>

      </Card>
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
          {type == "Connect with payment API" ? <Stack sx={{ color: 'grey.500' }} spacing={2}>
            <CircularProgress color="secondary" /></Stack> : <img src={imgSrc} id="preview" width="100%" height="250" />}
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
      <MDButton onClick={updateBio} sx={{ mt: 4, width: 80, top: "85%", right: "15px", position: "absolute" }} size="small" fullWidth={true} variant="gradient" color="primary" >Next</MDButton>

    </Grid>
  </Box >
  )
}
