import * as React from 'react';
import { useState, useContext } from 'react'
import Box from '@mui/material/Box';
import { Button, Grid, TextField } from '@mui/material';
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
  const [idtype, setIdtype] = useState("")
  const [gname, setgname] = useState("")
  const [gidtype, setgIdtype] = useState("")
  const [idNo, setidNo] = useState("")
  const { setObj } = useContext(StateContext)
  const [btn, setbtn] = useState(false)
  let handleNext = prop.next
  const handleModalNext = React.useCallback(() => {
    handleNext()
  }, [prop.next])

  const updateBio = () => {
    let data = {
      occupation,
      disability,
      guarantor: gname,
      type: idtype,
      idNo: idNo,
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
    idtype,
    idNo,])

  return (
    <div>
      <Box container sx={style.modal}>
        <Grid>
          <Grid alignItems="center" p={4} gap={15} container >
            <Grid >
              <Field
                field={"First Name"}
                value={prop.fullName}
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
            <Grid sx={{ width: 200 }} item >
              <TextField onChange={(e) => setoccupation(e.target.value)} size="small" defaultValue={prop.occupation} label="Occupation" />
            </Grid>
            <Grid sx={{ width: 200 }} item >
              <TextField onChange={(e) => setdisability(e.target.value)} size="small" defaultValue={prop.disability} label="Disability" />
            </Grid>
            <Grid sx={{ width: 200 }} item >
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
                {idTypeList.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid sx={{ width: 200 }} item >
              <TextField
                onChange={idtype == "GUARANTOR" ? (e) => setgname(e.target.value) : (e) => setidNo(e.target.value)}
                required
                fullWidth
                size="small"
                defaultValue={prop.idNo}
                label={idtype == "GUARANTOR" ? "Guarantor's Name" : "ID Number"} />
            </Grid>
            <Grid sx={{ display: idtype == "GUARANTOR" ? "block" : "none", width: 200 }} item >
              <TextField
                select
                fullWidth
                disabled={idtype == "GUARANTOR" ? false : true}
                label="ID Type"
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
            <Grid sx={{ display: idtype == "GUARANTOR" ? "block" : "none", width: 200 }} item >
              <TextField onChange={(e) => setidNo(e.target.value)} required={idtype == "GUARANTOR" ? true : false} size="small" defaultValue={prop.idNo} label="ID Number" />
            </Grid>

          </Grid>
        </Grid>
        <Button disabled={btn} onClick={updateBio} size="small" disableElevation sx={{ width: 200, bottom: "-20px", right: "37%", position: "absolute" }} variant='contained' fullWidth={true} color="primary" >Save and continue</Button>
      </Box>
    </div>

  );
}
function Field({ field, value }) {
  return (
    <Grid item sx={{ minWidth: 10, mt: 0.4 }} >
      <p style={{ margin: 0, color: "black", fontWeight: "bold", fontSize: "12px", fontFamily: "cursive" }}>{field}</p>
      <hr style={{ margin: 0, marginBottom: "1px", color: "grey" }} />
      <p style={{ margin: 0, fontSize: "18px", color: "gray" }} >{value}</p>
    </Grid>
  )
}