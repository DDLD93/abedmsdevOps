import * as React from 'react';
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
import PaidIcon from '@mui/icons-material/Paid';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import "./style.css"
import { Button, Card, Grid, TextField } from '@mui/material';


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
    height: "90%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 5,
    pb: 5,
    pr: 2,
    pl: 2
  },
  card: {
    display: "flex",
    gap: 3,
    width: "100%",
    justifyContent: "space-between"
  }
};

export default function Info(prop) {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState(null);
  const handleOpen = () => {setOpen(true)};

  
const Input = styled('input')({
  display: 'block',
});

  const handleClose = (prop) => {
    prop.reFetch
    setOpen(false)
  };
const methodList=[
  "Table payment",
  "Bank Transfer",
  "POS",
  "Mobile Money /Wallet Transfer"

]


  React.useEffect(() => {


  }, [])

  return (
    <div>
      <IconButton size='large' onClick={handleOpen} aria-label="fingerprint" color="secondary">
        <VerifiedUserIcon />
      </IconButton>
      <Modal

        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        
             <Box container sx={style.modal}>
             <Typography textAlign="center" variant="h5" component="h6">
               {"Payment Validation"}
             </Typography>
             <Grid wrap="nowrap" flexDirection="row-reverse" container >
             <Card sx={{width:250,height:270,p:2}}>
                 <img style={{borderRadius:"50%",marginBottom:"10px"}} src={photo} alt="avatar" width="150" height="150"  />
                 <p style={{fontSize:"10px",textAlign:"start"}} ><span style={{fontWeight:"bolder"}} >Name</span>: {prop.name}</p>


                 <p style={{fontSize:"10px",textAlign:"start"}} ><span style={{fontWeight:"bolder"}} >Code</span>: KAD/KG/001</p>
                 <p style={{fontSize:"10px"}} ><span style={{fontWeight:"bolder"}} >Verification</span>: <em style={{color:"#4caf50"}} >Verfied</em> </p>
                 <p style={{fontSize:"10px"}} ><span style={{fontWeight:"bolder"}} >Payment</span>: <em style={{color:"#4caf50"}} >Paid</em> </p>
                 <h2 style={{color:"green", margin:"auto auto"}}></h2>
       
 
             </Card>
             <Grid alignItems="center" justifyContent="center"  gap={1} container >
                 <Grid sm={5} item >
                    
                 <TextField
                 disabled
                   label="Method of Payment"
                   defaultValue={prop.paymentMothod}
                   size='small'
                  />
                 </Grid>
                 <Grid sm={5} item >

            
                 <TextField
                   label="Transaction id"
                   defaultValue={prop.transactionId}
                   size='small'
                  />
                 </Grid>
                   <img src={photo} style={{width:"300px",height:"240px",margin:3}} alt="" srcset="" />
                
                 <Grid sm={11} item >
                     <TextField defaultValue={prop.remark} fullWidth size="small" label="Remarks" multiline />
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
             </Grid>
            
             <Grid container justifyContent="space-around" >
             <MDButton sx={{ mt: 4, ml:9, mr:9 }} size="small"  variant="gradient" color="error" >Reject</MDButton>
             <MDButton sx={{ mt: 4, ml:9, mr:9 }} size="small"  variant="gradient" color="primary" >Validate</MDButton>

             </Grid>
 
           </Box>   
        </Fade>
      </Modal>
    </div>
  );
}