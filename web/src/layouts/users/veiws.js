import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Icon from "@mui/material/Icon";
import Typography from '@mui/material/Typography';
import MDButton from 'components/MDButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import config from "../../config"

import VisibilityIcon from '@mui/icons-material/Visibility';

import { Grid, IconButton, TextField } from '@mui/material';

const style = {
 modal: {
  position: 'absolute',
  display:"flex",
  flexDirection:"column",
  justifyContent: "space-between",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  pt:1,
  pb:3,
  pr: 4,
  pl:4
},
card:{
  display:"flex",
  gap :3,
  width:"100%",
  justifyContent: "space-between"
}
};
const userType = [
  {
    value: 'psp',
    label: 'PSP',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'qa',
    label: 'QA',
  },
  {
    value: 'staff',
    label: 'Staff',
  },
];
export default function ViewsBox(prop) {
  const [open, setOpen] = React.useState(false);
  const [fullName, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState("");
  const [type, setType] = React.useState('SPS');
  const [button, setButton] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = () => {
    const data ={
        fullName,
        phone,
        email,
        code:"KD/KG/002",
        password:123456,
        userType:type,
        state  
    }
    fetch(`${config.EndPionts}/user/register`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res=>res.json())
    .then(res=>{
      handleClose()
      console.log(res)
    })
  };

  React.useEffect(() => {
    if(!email||!phone||!fullName) {
      setButton(true)
    }else{
      setButton(false)
    }
  
  }, [state,email,phone,fullName])
  

  return (
    <div>
        <IconButton onClick={handleOpen} size="small" aria-label="delete">
                                    <VisibilityIcon />
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
            
          <Typography sx={{ mt: 3 }} textAlign="center" id="transition-modal-title" variant="h3" component="p">
              {prop.name}
            </Typography>
            <Typography sx={{mb:2}} textAlign="center" id="transition-modal-title" variant="p" component="h5">
              {prop.code}
            </Typography>
            <Typography sx={{ mb: 1}} fontSize="15px" textAlign="start"  variant="p" component="p">
              Basic Info
            </Typography>
            <Grid container gap={3}>
                <Grid item xs={12} >
                    <TextField disabled defaultValue={prop.name} variant="standard" label="Batch Name"/>
                    <TextField disabled defaultValue={prop.total} variant="standard" label="Total Provisioned"/>
                </Grid>
                <Grid item xs={12} >
                    <TextField disabled defaultValue={prop.startingDate} variant="standard" label="Start Date"/>
                    <TextField disabled defaultValue={prop.closingDate} variant="standard" label="Close Date"/>
                </Grid>
                <Grid item xs={12} >
                    <TextField multiline disabled defaultValue={prop.states} variant="standard" label="States"/>
                    <TextField disabled defaultValue={prop.code} variant="standard" label="Batch Code"/>
                </Grid>
                {/* <Typography sx={{ mb: 1}} fontSize="15px" textAlign="start"  variant="p" component="p">
              Personel Info
            </Typography>
                <Grid item xs={12} >
                    <TextField disabled defaultValue={"1200"} variant="standard" label="Total"/>
                    <TextField disabled defaultValue={prop.code} variant="standard" label="Batch Code"/>
                </Grid>
               */}
            </Grid>


            <MDButton disabled={button} onClick={submit} sx={{mt:4}} size="small" fullWidth={true} variant="gradient" color="primary" >Create</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}