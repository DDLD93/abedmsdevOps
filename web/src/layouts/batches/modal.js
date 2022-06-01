import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Icon from "@mui/material/Icon";
import Typography from '@mui/material/Typography';
import MDButton from 'components/MDButton';
import Fab from '@mui/material/Fab';
import { Grid, NativeSelect, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
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

export default function ModalBox(prop) {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState("");
  const [states, setStates] = React.useState([]);
  const [batchName, setbatchName] = React.useState("")
  const [tempList, settempList] = React.useState([])
  const [budget, setBudget] = React.useState("");
  const [Tbudget, setTbudget] = React.useState(0);
  const [date, setDate] = React.useState("");
  const [button, setButton] = React.useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [focus, setfocus] = React.useState(false)
  const {fetchBatch,notification} = React.useContext(StateContext)
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
  const stateList = [
    "",
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
  ]
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setState(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const submit = () => {
    const data = {
      closingDate: date,
      total: Tbudget,
      name: batchName,
      states: states
    }
    console.log(data)
    fetch(`${config.EndPionts}/batch`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => {
        fetchBatch()
        notification("success","new batch added")

        handleClose()}).catch(err => {
          notification("error",err.message)
        })
        
    
  };

  function add() {
    let obj = {
      state: state || "Abia",
      total: budget
    }
    if(!budget || !state ){
      notification("error","state or total fields cannot be empty")
    }else{
      if(states.includes(state)== false){
        console.log(true)
        setTbudget(prev => (prev + budget))
        settempList(prev => [...prev, obj])
        setStates(prev => [...prev, obj.state])
        setState("")
        setBudget("")
        return
      }
      notification("error","duplicate state")
    }
    
   

    // tempList.map(li=>{
    // console.log(stateList.includes(li.state))

    // })
  }

  function deleteArr(e) {
    let idx = e.target.parentElement.id
    console.log(idx)
    settempList(tempList.filter((item, index) => index != idx))
    setTbudget(prev => (prev - Number(tempList[idx].total)))
  }
  React.useEffect(() => {
    if (!batchName || !date || !tempList.length) {
      setButton(true)
    } else {
      setButton(false)
    }

  }, [batchName, date, tempList])


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
              New Batch
            </Typography>
            <Grid container gap={3}>
              <Grid container flexWrap="nowrap" gap={1}>
                <Grid item sm={6} >
                  <TextField value={Tbudget} helperText="Maximum number of Beneficiaries" type="number" size='small' fullWidth label="Total Target " />
                </Grid>
                <Grid item sm={6} >
                  <TextField onChange={(e) => setbatchName(e.target.value)} type="text" size='small' fullWidth label="Batch Name " />
                </Grid>
                <Grid item sm={6} >
                  <TextField
                    onFocus={() => setfocus(true)}
                    onBlur={() => setfocus(false)}
                    size="small"
                    onChange={(e) => {
                      if (e.target.value) setDate(e.target.value);
                      else setDate(false);
                    }}
                    type={date || focus ? "date" : "text"}
                    label="Closing Date"
                    variant="outlined"
                  />

                </Grid>

              </Grid>
              <Grid flexWrap="nowrap" alignItems="center" container gap={1} item sm={12} >

                <TextField
                  select
                  label="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  size='small'
                  SelectProps={{
                    native: true,
                  }}
                >
                  {stateList.map((option) => (
                    <option key={option.value} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
                <TextField value={budget} type="number" onChange={(e) => setBudget(Number(e.target.value))} size='small' label="Target for State " />
                <AddCircleIcon
                  color='primary'
                  onClick={add}
                />

              </Grid>
              {tempList.map((li, indx) => (
                <div>
                  <List
                    state={li.state}
                    total={li.total}
                    id={indx}
                    deleteArr={deleteArr}
                  />

                </div>
              ))}
            </Grid>
            <MDButton disabled={button} onClick={submit} sx={{ mt: 4 }} size="small" fullWidth={true} variant="gradient" color="primary" >Create</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

const List = (prop) => {
  return (
    <div id={prop.id} style={{ backgroundColor: "#b5bded", padding: "0px 3px" }} >
      <span style={{ fontSize: "12px", color: "blue" }}>{prop.state}    </span><span style={{ fontSize: "12px", color: "blue" }} >{prop.total}</span><span onClick={prop.deleteArr} style={{ fontSize: "13px", fontWeight: "bolder", cursor: "pointer" }}>     x</span>
    </div>
  )
}