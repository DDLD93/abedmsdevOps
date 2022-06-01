import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Icon from "@mui/material/Icon";
import Typography from '@mui/material/Typography';
import MDButton from 'components/MDButton';
import Fab from '@mui/material/Fab';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import config from "../../config"

import VisibilityIcon from '@mui/icons-material/Visibility';

import { Grid, IconButton, TextField } from '@mui/material';
import { StateContext } from 'store/store';
import list from 'assets/theme-dark/components/list';

const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minHeight:400,
    maxWidth: 400,
    width:600,
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
  const [phone, setPhone] = React.useState("");
  const [budget, setBudget] = React.useState(0)
  const [lga, setLga] = React.useState(null)
  const [lgaList, setLgaList] = React.useState([])
  const [wardList, setWardList] = React.useState([])
  const [ward, setWard] = React.useState(null)
  const [state, setState] = React.useState("");
  const [button, setButton] = React.useState(false)
  const {user} = React.useContext(StateContext)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submit = () => {
    const data = {
      fullName,
      phone,
      email,
      code: "KD/KG/002",
      password: 123456,
      userType: type,
      state
    }
    fetch(`${config.EndPionts}/user/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        handleClose()
        console.log(res)
      })
  };
  function getLGAs() {
    fetch(`${config.EndPionts}/beneficiaries/lga/${state}`).
    then(res=>(res.json())).
    then(list =>{
      setLgaList(list)
    }) 
  }
  function getWards() {
    fetch(`${config.EndPionts}/beneficiaries/ward/${lga}`).
    then(res=>(res.json())).
    then(list =>{
      setWardList(list)
    }) 
  }
  function add() {
  
    }

  React.useEffect(() => {
    if ( !phone ) {
      setButton(true)
    } else {
      setButton(false)
    }
  }, [])

  React.useLayoutEffect(() => {
    getLGAs()
  }, [state])


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
            <Typography sx={{ mb: 1 }} fontSize="15px" textAlign="start" variant="p" component="p">
              Basic Info
            </Typography>
            <Grid  gap={2.4} container>
              <Grid flexWrap="nowrap" container gap={2} >
              <TextField label="Total beneficiaries" type="number" size='small' />
              <TextField label="Total wards" type="number" size='small' />

              </Grid>
              <Grid flexWrap="nowrap" alignItems="center" container gap={1} item sm={12} >

                <TextField
                  select
                  sx={{minWidth:100}}
                  label="State"
                  value={state}
                  onChange={(e) => {setState(e.target.value)}}
                  size='small'
                  defaultValue={""}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {user.states.map((option) => (
                    <option key={option.value} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <TextField
                  select
                  sx={{minWidth:100}}
                  label="LGA"
                  value={lga}
                  onChange={(e) => setState(e.target.value)}
                  size='small'
                  SelectProps={{
                    native: true,
                  }}
                >
                  {lgaList.map((option) => (
                    <option key={option.value} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <TextField
                  select
                  sx={{minWidth:100}}
                  label="Ward"
                  value={ward}
                  onChange={(e) => setState(e.target.value)}
                  size='small'
                  SelectProps={{
                    native: true,
                  }}
                >
                  {wardList.map((option) => (
                    <option key={option.value} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <AddCircleIcon
                  color='primary'
                  onClick={add} />
              </Grid>
            </Grid>
            <MDButton disabled={button} onClick={submit} sx={{ mt: 4 }} size="small" fullWidth={true} variant="gradient" color="primary" >Assign</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}