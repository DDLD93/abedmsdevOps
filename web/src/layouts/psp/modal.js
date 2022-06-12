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
import { useTheme } from '@mui/material/styles';
import { Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import config from "../../config"
import CloseIcon from '@mui/icons-material/Close';
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



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const stateList = [
  "",
  "abia",
  "adamawa",
  "akwa Ibom",
  "anambra",
  "bauchi",
  "bayelsa",
  "benue",
  "borno",
  "cross River",
  "delta",
  "ebonyi",
  "edo",
  "ekiti",
  "enugu",
  "abuja",
  "gombe",
  "imo",
  "jigawa",
  "kaduna",
  "kano",
  "katsina",
  "kebbi",
  "kogi",
  "kwara",
  "lagos",
  "nasarawa",
  "niger",
  "ogun",
  "ondo",
  "osun",
  "oyo",
  "plateau",
  "rivers",
  "sokoto",
  "taraba",
  "yobe",
  "zamfara"
]
export default function ModalBox(prop) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [button, setButton] = React.useState(false)
  const [emailErro, setemailErro] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { batchList, fetchpsp,notification } = React.useContext(StateContext)
  const theme = useTheme();
  const [stateName, setStateName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(value)
    setStateName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const submit = () => {
    const data = {
      fullName:name,
      phone,
      password:"humanitarian",
      email,
      company:name,
      userType:"psp",
      pspInfo:{states:stateName
      },
      
    }
    fetch(`${config.EndPionts}/user/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      return res.json()
    })
      .then(res => {
        notification("success","Account added")
        setStateName([])
        fetchpsp()
        handleClose()
      }).catch(err => notification("error",err.message))
  };

  React.useEffect(() => {
    if (!email || !phone || !name || !stateName) {
      setButton(true)
    } else {
      if(/.+@.+\.[A-Za-z]+$/.test(email)){
        setButton(false)
        setemailErro(false)
        }else{
          setemailErro(true)
        }
    }

  }, [email, phone, name,stateName])


  return (
    <div>
      <Fab onClick={handleOpen} style={{ position: "fixed", zIndex: 99, right: "30px", bottom: "70px" }} size="medium" color="primary" aria-label="add">
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
          <CloseIcon
          onClick={handleClose}
          sx={{position:"absolute",
               left:"10px",
               cursor:"pointer"  }}
          />
            <Typography sx={{ m: 3 }} textAlign="center" id="transition-modal-title" variant="h4" component="h2">
              Add PSP
            </Typography>
            <Grid container gap={3}>
              <Grid item sm={12} >
                <TextField onChange={(e) => setName(e.target.value)} size='small' fullWidth label="Company Name" />
              </Grid>
              <Grid item sm={12} >
                <TextField error={emailErro} helperText={emailErro?"invalid email":""} type="email" onChange={(e) => setEmail(e.target.value)} size='small' fullWidth label="Email" />
              </Grid>
              <Grid item sm={12} >
                <TextField onChange={(e) => setPhone(e.target.value)} size='small' fullWidth label="Phone" />
              </Grid>
              <Grid item >
              <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Select States</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={stateName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Select States" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {stateList.map((state) => (
            <MenuItem
              key={state}
              value={state}
              style={getStyles(state, stateName, theme)}
            >
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
              </Grid>
            </Grid>

            <MDButton disabled={button} onClick={submit} sx={{ mt: 4 }} size="small" fullWidth={true} variant="gradient" color="primary" >Create</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}