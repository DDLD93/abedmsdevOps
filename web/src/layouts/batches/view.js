import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MDButton from 'components/MDButton';
import config from "../../config"

import { Grid, TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';


const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 1,
    pb: 3,
    pr: 4,
    pl: 4
  },
  card: {
    display: "flex",
    gap: 3,
    width: "100%",
    justifyContent: "space-between"
  }
};

export default function Views(prop) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState([]);
  const [budget, setBudget] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [button, setButton] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

 

  const suspend = () => {
    let url = `${config.EndPionts}/batch/${prop.id}`
    console.log(url)
    fetch(url,{
      method:"PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({status:"suspended"})
    }).
    then(res => (res.json())).
    then(res => notification("success","batch suspended")).  
    catch(err => notification("error",err.message))
  };
  



  return (
    <div>
        <IconButton size='large' onClick={handleOpen} aria-label="fingerprint" color="secondary">
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
                    <TextField multiline disabled defaultValue={prop.states.toString()} variant="standard" label="States"/>
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

            <MDButton disabled={button} onClick={suspend} sx={{ mt: 4 }} size="small" fullWidth={true} variant="gradient" color="primary" >Suspend this Batch</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}