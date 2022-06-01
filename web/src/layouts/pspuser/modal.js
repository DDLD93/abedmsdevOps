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
import { Grid, TextField } from '@mui/material';
import config from "../../config"
import { StateContext } from 'store/store';

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
const stateList = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara"
];
export default function ModalBox(prop) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [button, setButton] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {batchList} = React.useContext(StateContext)

  const submit = () => {
    const data ={
        name,
        phone,
        email, 
    }
    fetch(`${config.EndPionts}/psp`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res=> {
      return res.json()
    })
    .then(res=>{
      handleClose()
    }).catch(err=>console.log(err))
  };

  React.useEffect(() => {
    if(!email||!phone||!name) {
      setButton(true)
    }else{
      setButton(false)
    }
  
  }, [email,phone,name])
  

  return (
    <div>
      <Fab onClick={handleOpen} style={{ position: "fixed", zIndex: 99, right: "30px", bottom: "70px"}} size="medium" color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
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
            <Typography sx={{m:3}} textAlign="center" id="transition-modal-title" variant="h4" component="h2">
              Add PSP
            </Typography>
           <Grid container gap={3}>
           <Grid item  sm={12} >
              <TextField onChange={(e)=> setName(e.target.value)} size='small' fullWidth label="Company Name" />
            </Grid>
            <Grid item sm={12} >
              <TextField onChange={(e)=> setEmail(e.target.value)} size='small' fullWidth label="Email" />
            </Grid>
            <Grid item sm={12} >
              <TextField onChange={(e)=> setPhone(e.target.value)} size='small' fullWidth label="Phone" />
            </Grid>
           <Grid container flexWrap="nowrap" gap={1}>
           {/* <Grid item sm={6} >
           <TextField
          select
          label="User Type"
          value={type}
          onChange={(e)=> setType(e.target.value)}
          size='small'
          SelectProps={{
            native: true,
          }}
          helperText="Please select user role"
        >
          {userType.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
            </Grid> */}
            {/* <Grid item sm={12} >
            <TextField
          select
          label="State"
          value={state}
          onChange={(e)=> setState(e.target.value)}
          SelectProps={{
            native: true,
          }}
          fullWidth
          size='small'
        >
          {stateList.map((option,index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </TextField>
            </Grid> */}
           </Grid>
           </Grid>

            <MDButton disabled={button} onClick={submit} sx={{mt:4}} size="small" fullWidth={true} variant="gradient" color="primary" >Create</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}