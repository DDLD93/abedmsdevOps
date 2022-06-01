import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import MDButton from 'components/MDButton';
import photo from '../../assets/images/marie.jpg'

import "./style.css"
import { Card, Grid, TextField } from '@mui/material';


const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: "80%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 4,
    pb: 4,
    pr: 1,
    pl: 1
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
  const handleOpen = () => {setOpen(true)};

  const handleClose = (prop) => {
    prop.reFetch
    setOpen(false)
  };



  React.useEffect(() => {


  }, [])

  return (
    <div>
      <IconButton size='large' onClick={handleOpen} aria-label="fingerprint" color="secondary">
        <Fingerprint />
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
            <Typography textAlign="center" variant="p" component="h6">
              {prop.name}
            </Typography>
            <Grid wrap="nowrap" flexDirection="row-reverse" container >
            <Card sx={{width:250,height:270,p:2}}>
                <img style={{borderRadius:"50%",marginBottom:"10px"}} src={photo} alt="avatar" width="150" height="150"  />
                <p style={{fontSize:"10px",textAlign:"start"}} ><span style={{fontWeight:"bolder"}} >Code</span>: KAD/KG/001</p>
                <p style={{fontSize:"10px"}} ><span style={{fontWeight:"bolder"}} >Verification</span>: <em style={{color:"#f99700"}} >pending</em> </p>
                <p style={{fontSize:"10px"}} ><span style={{fontWeight:"bolder"}} >Payment</span>: <em style={{color:"#f99700"}} >Not paid</em> </p>
                <button style={{backgroundColor:"green",border:"0px none black", borderRadius:"5px",marginTop:"5px"}}>verify</button>

            </Card>
            <Grid alignItems="center" justifyContent="center"  gap={3} container >
                <Grid item >
                    <TextField size="small" defaultValue="Umar Jere" label="Full Name" />
                </Grid>
                <Grid item >
                    <TextField size="small" defaultValue="Male" label="Gender" />
                </Grid>
                <Grid item >
                    <TextField size="small" defaultValue="28" label="Age" />
                </Grid>
                <Grid item >
                    <TextField size="small" defaultValue="Kano" label="State" />
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
                </Grid>
            </Grid>
            </Grid>
           
            

            <MDButton sx={{ mt: 4, ml:9, mr:9 }} size="small"  variant="gradient" color="primary" >Save</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}