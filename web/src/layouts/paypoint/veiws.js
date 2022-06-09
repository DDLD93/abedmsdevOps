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

import { CircularProgress, Grid, IconButton, Stack, TextField } from '@mui/material';
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
    minHeight: 400,
    maxWidth: 400,
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 3,
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
  const [wardArr, setwardArr] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [lga, setLga] = React.useState(null)
  const [lgaList, setLgaList] = React.useState([""])
  const [wardList, setWardList] = React.useState([""])
  const [fetching, setfetching] = React.useState(false)
  const [ward, setWard] = React.useState(null)
  const [state, setState] = React.useState("");
  const [button, setButton] = React.useState(true)
  const { user,notification } = React.useContext(StateContext)
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setwardArr([])
    setTotal(0)
    setLga("")
    setLgaList([])
    setWardList([])
    setWard("")
    setState("")
    setOpen(false);
  }

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
    setfetching(true)
    fetch(`${config.EndPionts}/beneficiaries/lga/${state}`).
      then(res => (res.json())).
      then(list => {
        setLgaList([lgaList,...list])
      }).catch(err=>{
        setfetching(false)
        //notification("error", "Error fetching allocated LGAs")
      })
  }
  function getWards() {
    setfetching(true)
    fetch(`${config.EndPionts}/beneficiaries/ward/${lga}`).
      then(res => (res.json())).
      then(list => {
        setWardList(["", ...list])
        setfetching(false)
        //notification("error", "Error fetching allocated wards")
      }).catch(err=>n)
  }


  function add() {
    fetch(`${config.EndPionts}/beneficiaries/count/${ward}`).
      then(res => (res.json())).
      then(num => {
        setwardArr([...wardArr, { ward, count: num }])
        setTotal(prev => prev + num)
      }).catch(err => console.log("errorr >>>>", err))
    console.log(wardArr)
  }
  function assign() {
    setButton(false)
    const wardList = wardArr.map(li=>{
      return {ward:li.ward}
    })
    fetch(`${config.EndPionts}/beneficiaries/assign/${prop.id}`,{
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
    },
      body:JSON.stringify(wardList)
    }).
      then(res => (res.json())).
      then(response => {
        handleClose()
        notification("success","Ward Allocated successfully")
      }).catch(err => notification("error",err.message) )
  }

  React.useEffect(() => {
    if (wardArr.length < 1) {
      setButton(true)
    } else {
      setButton(false)
    }
  }, [wardArr])

  React.useLayoutEffect(() => {
    if(!lga){
      getLGAs()
    }
  }, [state])
  React.useLayoutEffect(() => {
    if(!ward){
      getWards()
    }
  }, [lga])


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
            <Typography sx={{ mb: 1 }} fontSize="15px" textAlign="center" variant="h3" component="p">
              {prop.terminal}
            </Typography>
            {/* <Typography sx={{ mb: 1 }} fontSize="15px" textAlign="start" variant="p" component="p">
              {prop.location}
            </Typography> */}
            <Grid gap={2.4} justifyContent="center" container>
              <Grid flexWrap="nowrap" container gap={2} >
                <TextField label="Total beneficiaries" value={total} type="number" size='small' />
                <TextField label="Total wards" value={wardArr.length} type="number" size='small' />
              </Grid>
              {/* {fetching?<Stack sx={{ color: 'grey.500',alignItems: "center", justifyContent: "center"}} spacing={2}>
            <p>fetching data</p>
            <CircularProgress sx={{}} color="secondary" /></Stack>:null} */}
              <Grid flexWrap="nowrap" alignItems="center" container gap={1} item sm={12} >

                <TextField
                  select
                  sx={{ minWidth: 100 }}
                  label="State"
                  value={state}
                  onChange={(e) => { setState(e.target.value) }}
                  size='small'
                  defaultValue={""}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {user.pspInfo.states && user.pspInfo.states.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <TextField
                  select
                  sx={{ minWidth: 100 }}
                  label="LGA"
                  value={lga}
                  onChange={(e) => setLga(e.target.value)}
                  size='small'
                  SelectProps={{
                    native: true,
                  }}
                >
                  {lgaList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <TextField
                  select
                  sx={{ minWidth: 100 }}
                  label="Ward"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  size='small'
                  SelectProps={{
                    native: true,
                  }}
                >
                  {wardList.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <AddCircleIcon
                  color='primary'
                  sx={{ cursor: "pointer" }}
                  onClick={add} />
              </Grid>
            </Grid>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }} >
              {wardArr.map((obj) => (
                <div style={{ display:"flex", height: "30px", width: "70px", backgroundColor: "lightgreen", fontSize: "14px", padding: "2px" }}>{obj.ward}: <span style={{ fontWeight: "bold" }} >{obj.count}</span> </div>
              ))}
            </div>
            <MDButton disabled={button} onClick={assign} sx={{ mt: 4 }} size="small" fullWidth={true} variant="gradient" color="primary" >Assign</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}