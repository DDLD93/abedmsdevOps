import * as React from 'react';
import Box from '@mui/material/Box';

import Webcam from "react-webcam";
import { Button, CircularProgress, Grid, Stack, TextField } from '@mui/material';
import { StateContext } from '../context/context';


const style = {
  modal: {
    position: 'relative',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
  },
};

export default function Payment(prop) {
  const [type, setType] = React.useState("Table payment");
  const [remark, setRemark] = React.useState("")
  const [accNo, setAccNo] = React.useState("")
  const [bankName, setBankName] = React.useState("")
  const [tranRef, setTranRef] = React.useState("")
  const [imgSrc, setimgSrc] = React.useState("")
  const { token, setObj } = React.useContext(StateContext)
  let handleNext = prop.next
  let id = prop.user
  const handleModalNext = React.useCallback(() => {
    handleNext()
  }, [handleNext])

  const methodList = [
    "Table payment",
    "Bank Transfer",
    "POS",
    "Mobile Money /Wallet Transfer",
    "Connect to payment API"

  ]
 
  const updateBio = () => {
    let data = {
      method: type,
      bankName,
      accNo,
      transRef:tranRef,
      remark,
      amount: 20000,
      imageHash: imgSrc
    }
    setObj("payment", data)
    handleModalNext()
  }


  React.useEffect(() => {


  }, [])

  return (
    < Box container sx={style.modal} >
      <Grid flexWrap={"nowrap"} flexDirection="column" alignItems="flex-start" justifyContent="center" gap={2} container >
        <Grid sm={12} item >
          <TextField
            select
            fullWidth
            label="Method of Payment"
            value={type}
            onChange={(e) => setType(e.target.value)}
            size='small'
            SelectProps={{
              native: true,
            }}
          >
            {methodList.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Grid>
        {/* <Grid sx={{ mb: 3 }} sm={6} item >
          <label htmlFor="contained-button-file">
            <span style={{ fontSize: "12px" }} >proof of payment</span>
            <Input onChange={(e) => imgPreview(e)} id="contained-button-file" type="file" />
          </label>
        </Grid> */}
        {type === "Connect to payment API" ? <Stack sx={{ color: 'grey.500', alignItems: "center" }} spacing={2}>
          <p>Searching for third-party payment Interface</p>
          <CircularProgress color="secondary" /></Stack> :type === "Table payment" ?<>
          <img src={imgSrc} id="preview" width="100%" height="200" />
          <Webcam
          style={{position:"absolute",right:"-230px",top:"-140px"}}
            audio={false}
            height={300}
            screenshotFormat="image/jpeg"
            width={200}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <Button

                onClick={() => {
                  const imageSrc = getScreenshot()
                  setimgSrc(imageSrc)
                }}
              >
                Snap
              </Button>
            )}
          </Webcam></> : <Grid flexWrap={"nowrap"} container gap={1} sm={12} item >
           

          <Grid sm={6} item >
            <TextField
              select
              fullWidth
              label="Bank Name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              size='small'
              SelectProps={{
                native: true,
              }}
            >
              {bankList.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid sm={6} item >
            <TextField
              fullWidth
              type={"number"}
              label="Account Number"
              value={accNo}
              onChange={(e) => setAccNo(e.target.value)}
              size='small' />
          </Grid>
        </Grid>
        }
        <Grid container gap={1} flexWrap="nowrap" >
          <Grid sm={6} item >
            <TextField onChange={(e) => setTranRef(e.target.value)} fullWidth size="small" label="Transaction reference" />
          </Grid>
          <Grid sm={6} item >
            <TextField onChange={(e) => setRemark(e.target.value)} fullWidth size="small" label="Remarks" multiline />
          </Grid>
        </Grid>
      </Grid>
      <Button onClick={updateBio} size="small" disableElevation sx={{ width: 200, marginTop: 8, marginLeft: "28%" }} variant='contained' fullWidth={true} color="primary" >Preview</Button>
    </Box >
  )
}
const videoConstraints = {
  width: 300,
  facingMode: { exact: "user" },
  height: 300,
};
const bankList = [
  { id: null, name: null ,code:null },
  { id: "1", name: "Access Bank" ,code:"044" },
  { id: "2", name: "Citibank",code:"023" },
  { id: "3", name: "Diamond Bank",code:"063" },
  { id: "4", name: "Dynamic Standard Bank",code:"" },
  { id: "5", name: "Ecobank Nigeria",code:"050" },
  { id: "6", name: "Fidelity Bank Nigeria",code:"070" },
  { id: "7", name: "First Bank of Nigeria",code:"011" },
  { id: "8", name: "First City Monument Bank",code:"214" },
  { id: "9", name: "Guaranty Trust Bank",code:"058" },
  { id: "10", name: "Heritage Bank Plc",code:"030" },
  { id: "11", name: "Jaiz Bank",code:"301" },
  { id: "12", name: "Keystone Bank Limited",code:"082" },
  { id: "13", name: "Providus Bank Plc",code:"101" },
  { id: "14", name: "Polaris Bank",code:"076" },
  { id: "15", name: "Stanbic IBTC Bank Nigeria Limited",code:"221" },
  { id: "16", name: "Standard Chartered Bank",code:"068" },
  { id: "17", name: "Sterling Bank",code:"232" },
  { id: "18", name: "Suntrust Bank Nigeria Limited",code:"100" },
  { id: "19", name: "Union Bank of Nigeria",code:"032" },
  { id: "20", name: "United Bank for Africa",code:"033" },
  { id: "21", name: "Unity Bank Plc",code:"215" },
  { id: "22", name: "Wema Bank",code:"035" },
  { id: "23", name: "Zenith Bank",code:"057" }
]