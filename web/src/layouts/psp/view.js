import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MDButton from 'components/MDButton';
import { Grid, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import config from "../../config"

import { StateContext } from 'store/store';

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

export default function PspVeiws(prop) {
  const [open, setOpen] = React.useState(false);
  const [amount, setamount] = React.useState(0)
  const [button, setButton] = React.useState(true)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {notification} = React.useContext(StateContext)
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
function addMoney() {
  setButton(true)
  fetch(`${config.EndPionts}/psp/${prop.id}`,{
    method:"PATCH",
    headers: {
      "Content-Type": "application/json",
  },
    body:JSON.stringify({
      amount
    })
  }).then(res=>(res.json())).
  then(res=>{
    setOpen(false)
    setButton(false)
    notification("success",`${amount} added into psp profile`)
  }).catch(err=>{
    setButton(false)
    notification("error",`${err.message}`)})
}

React.useEffect(() => {
  if(!amount || amount <= 0){
    setButton(true)
  }else{
    setButton(false)
  }  
}, [amount])
  



  return (
    <div>
 <IconButton size='large' onClick={handleOpen} aria-label="fingerprint" color="secondary">
  <AddIcon />
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
          <Typography sx={{ mt: 3 }} textAlign="center" id="transition-modal-title" variant="h4" component="p">
              Disbursment to PSP
            </Typography>           
            <Grid container gap={3}>
                <Grid item xs={12} >
                    <TextField onChange={(e)=>setamount(e.target.value)} type="Number" fullWidth variant="standard" label="Amount" helperText="Disbursment made to psp"/>
                </Grid>
            </Grid>
            <MDButton onClick={addMoney} disabled={button} sx={{ mt: 4 }} size="small" fullWidth variant="gradient"  color="primary" >Add Funds</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}