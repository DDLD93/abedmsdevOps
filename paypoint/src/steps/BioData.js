import * as React from 'react';
import { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import { Button, Card, CircularProgress, Divider, Grid, IconButton, Input, Stack, TextField } from '@mui/material';
import { StateContext } from '../context/context';




const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    height: "70%",
    bgcolor: 'background.paper',
  }
};

export default function Biodata(prop) {
  const [occupation, setoccupation] = useState("")
  const [disability, setdisability] = useState("")
  const [phone, setphone] = useState('')
  const [scn, setScn] = useState(false)
  const [idtype, setIdtype] = useState("")
  const [gname, setgname] = useState("")
  const [gidtype, setgIdtype] = useState("")
  const [idNo, setidNo] = useState("")
  const [file, setFile] = useState("")
  const [imgSrc, setimgSrc] = React.useState("")
  const { setObj } = useContext(StateContext)
  const [btn, setbtn] = useState(false)
  let handleNext = prop.next
  const handleModalNext = React.useCallback(() => {
    handleNext()
  }, [prop.next])

  const imgPreview = (e) => {
    setScn(false)
    getBase64(e.target.files[0])

  }
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setimgSrc(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const updateBio = () => {
    let data = {
      occupation,
      disability,
      guarantor: gname,
      type: idtype,
      idNo: idNo,
      imagePath: imgSrc
    }
    setObj("identification", data)
    handleModalNext()
  }

  const idTypeList = [
    "",
    "NIN",
    "PVC",
    "INTL PASSPORT",
    "DRIVERS LICENSE",
    "PHONE",
    "GUARANTOR"
  ]
  const GidTypeList = [
    "",
    "NIN",
    "PVC",
    "INTL PASSPORT",
    "DRIVERS LICENSE",
    "PHONE",
  ]


  React.useEffect(() => {
    if (!occupation || !disability || !idtype || !idNo) {
      setbtn(true)
    } else {
      setbtn(false)
    }


  }, [occupation,
    disability,
    phone,
    idtype,
    idNo,
    file])

  return (
    <div>

      <Box container sx={style.modal}>
        <Grid>
          <Grid alignItems="center"  p={2} gap={15} container >
            <Grid gap={4} >
              <Field
                field={"First Name"}
                value={"Umar Adamu Jere"}
              />
              <Field
                field={"Gender"}
                value={prop.gender}
              />
              <Field
                field={"Age"}
                value={prop.age}
              />
              <Field
                field={"State"}
                value={prop.state}
              />
            </Grid>
            <Grid>
              <Field
                field={"LGA"}
                value={prop.lga}
              />
              <Field
                field={"Ward"}
                value={prop.ward}
              />
              <Field
                field={"Phone"}
                value={prop.phone}
              />
              <Field
                field={"Marital Status"}
                value={prop.maritalStatus}
              />
            </Grid>
          </Grid>
          <Grid p={3} gap={2} container >
            <Grid sx={{ minWidth: 160 }} item >
              <TextField onChange={(e) => setoccupation(e.target.value)} size="small" defaultValue={prop.occupation} label="Occupation" />
            </Grid>
            <Grid sx={{ maxWidth: 160 }} item >
              <TextField onChange={(e) => setdisability(e.target.value)} size="small" defaultValue={prop.disability} label="Disability" />
            </Grid>
            <Grid sx={{ minWidth: 160 }} item >
              <TextField
                select
                label="ID Type"
                fullWidth
                sx={{ m: 0, p: 0 }}
                value={idtype}
                onChange={(e) => setIdtype(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                size='small'
              >
                {idTypeList.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid sx={{ minWidth: 160 }} item >
              <TextField
                onChange={idtype == "GUARANTOR" ? (e) => setgname(e.target.value) : (e) => setidNo(e.target.value)}
                sx={{ width: 230 }}
                required
                fullWidth
                size="small"
                defaultValue={prop.idNo}
                label={idtype == "GUARANTOR" ? "Guarantor's Name" : "ID Number"} />
            </Grid>
            <Grid sx={{ display: idtype == "GUARANTOR" ? "block" : "none" }} sm={5} item >
              <TextField
                select
                disabled={idtype == "GUARANTOR" ? false : true}
                label="ID Type"
                sx={{ width: 250 }}
                value={gidtype}
                onChange={(e) => setgIdtype(e.target.value)}
                SelectProps={{
                  native: true,
                }}
                size='small'
              >
                {GidTypeList.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid sx={{ display: idtype == "GUARANTOR" ? "block" : "none" }} item >
              <TextField sx={{ width: 230 }} onChange={(e) => setidNo(e.target.value)} required={idtype == "GUARANTOR" ? true : false} size="small" defaultValue={prop.idNo} label="ID Number" />
            </Grid>
           
          </Grid>
        </Grid>
        <Button disabled={btn} onClick={updateBio} size="small" disableElevation sx={{ width: 200, marginLeft: "33%" }} variant='contained' fullWidth={true} color="primary" >Save and continue</Button>
        {/* <MDButton  onClick={updateBio}  sx={{mt: 4, width:80,top:"85%",right:"15px",position:"absolute"}} size="small" fullWidth={true} variant="outlined" color="primary" >Back</MDButton> */}
      </Box>
    </div>

  );
}
function Field({ field, value }) {
  return (
    <Grid item sx={{ minWidth: 10 }} >
      <p style={{ margin: 0, color: "gray", fontSize: "11px", fontFamily: "cursive" }}>{field}</p>
      <hr style={{ margin: 0, marginBottom: "1px", color: "black" }} />
      <p style={{ margin: 0, fontSize: "17px", fontWeight: "bold" }} >{value}</p>
    </Grid>
  )
}