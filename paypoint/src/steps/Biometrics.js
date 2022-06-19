import * as React from 'react';
import Box from '@mui/material/Box';
import Webcam from "react-webcam";
import { Button, CircularProgress, Grid, Input, Stack } from '@mui/material';
import { StateContext } from '../context/context';




const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: "315px",
    bgcolor: 'background.paper',
  },
  card: {
    display: "flex",
    gap: 1,
    width: "100%",
    margin: "0",
    marginTop: "150px",
    padding: "25px",
    justifyContent: "space-around"
  }
};

export default function Biometric(prop) {
  const [Right, setRight] = React.useState("")
  const [btn, setbtn] = React.useState(true)
  const [image, setimage] = React.useState("")
  const [scn, setScn] = React.useState(false)
  const [scnImg, setscnImg] = React.useState(null)
  const { setObj } = React.useContext(StateContext)
  let handleNext = prop.next
  const handleModalNext = React.useCallback(() => {
    handleNext()
    //stopScan()
  }, [handleNext])

  const imgPreview = (e) => {
    setScn(false)
    getBase64(e.target.files[0])

  }
  function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setscnImg(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  const updateBio = () => {
    let data = {
      thumbHash: Right,
      imageHash: image,
      documentHash: scnImg
    }
    setObj("biometric", data)
    handleModalNext()
  }
  const Fingerscanner = window.Fingerprint


  class ScannerSdk {
    constructor() {
      this.sdk = new Fingerscanner.WebApi()

      this.sdk.onSamplesAcquired = function (s) {
        console.log("sample Accquired")
        samplesAcquired(s)
      }
    }
    startCapture() {
      this.sdk.startAcquisition(Fingerscanner.SampleFormat.PngImage).then(function () {
        return console.log('Scanner Online')
      }, function (error) {
        return console.log('Error connecting to scanner')
      });
    }
    stopCapture() {
      this.sdk.stopAcquisition().then(function () {
        return console.log('Scanner Offline')
      }, function (error) {
        return console.log('Error al detener la captura de huella')
      })
    }
    getDeviceList() {
      return this.sdk.enumerateDevices()
    }
  }
  function samplesAcquired(s) {
    let samples = JSON.parse(s.samples);
    let data = "data:image/png;base64," + Fingerscanner.b64UrlTo64(samples[0])
    setRight(data)
  }
 

// React.useMemo(() => {
//     var scn = new ScannerSdk()
//     scn.startCapture()
// }, [])
  React.useEffect(() => {
    var scn = new ScannerSdk()
    scn.startCapture()
    return ()=>{
      scn.stopCapture()
    }
  }, [])

  React.useEffect(() => {
    if (!Right || !image) {
      setbtn(true)
    } else {
      setbtn(false)
    }
  }, [Right, image])
  return (
    <Box container sx={style.modal}>
      <div style={style.card} >
        <div style={{ width: 120, height: 130, borderRadius: "10%", border: "1px solid blue" }} >
          <img src={Right} id="thumb" style={{ textAlign: "center", fontSize: "small", fontWeight: "bold", borderRadius: "10%" }} alt="Place your Right Thumb on the scanner" width="120" height="130px" />
        </div>
        <div style={{ width: 120, height: 130, borderRadius: "10%", border: "1px solid blue" }} >
          <img src={image} id="thumb" style={{ textAlign: "center", fontSize: "small", fontWeight: "bold", borderRadius: "10%" }} width="120" height="130px" />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }} >
          <Webcam
            audio={false}
            height={150}
            screenshotFormat="image/jpeg"
            width={130}
            videoConstraints={videoConstraints}
          >
            {({ getScreenshot }) => (
              <Button
                onClick={() => {
                  const imageSrc = getScreenshot()
                  setimage(imageSrc)
                }}
              >
                Snap
              </Button>
            )}
          </Webcam>
        </div>

      </div>
      <Grid container p={2}>
        <Grid item sm={3} container gap={3} flexDirection="column" >
          <Button variant="outlined" onClick={() => { setScn(true) }} sx={{ width: 12 }} size='small' >Scan</Button>
          <label htmlFor="contained-button-file">
            <Input sx={{display:"none"}} onChange={(e) => imgPreview(e)} accept="image/*" id="contained-button-file" multiple type="file" />
            <Button sx={{ width: 50 }} size='small' variant="contained" component="span">
              Upload
            </Button>
          </label>
          <Button disabled sx={{ width: 50 }} size='small' variant="contained" component="span">Snap</Button>
        </Grid>
        <Grid item sm={9} >
          {!scn ? <img src={scnImg} id="preview" width="100%" height="150" /> : <Stack sx={{ color: 'grey.500', alignItems: "center" }} spacing={2}>
            <p>Waiting for Scanner peripherals...</p>
            <CircularProgress color="secondary" /></Stack>}
        </Grid>
      </Grid>
      <Button disabled={btn} onClick={updateBio} size="small" disableElevation sx={{ width: 200, marginLeft: "33%" }} variant='contained' fullWidth={true} color="primary" >Save and continue</Button>
    </Box>

  );
}
const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user"
};