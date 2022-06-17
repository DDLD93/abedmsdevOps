import * as React from 'react';
import Box from '@mui/material/Box';
//import Webcam from 'webcam-easy';
import Webcam from "react-webcam";
import { Button, CircularProgress, Grid, Input, Stack } from '@mui/material';
import { Buffer } from 'buffer';
import { StateContext } from '../context/context';




const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: "370px",
    bgcolor: 'background.paper',
  },
  card: {
    display: "flex",
    gap: 1,
    width: "100%",
    margin:"0",
    marginTop:"150px",
    padding: "25px",
    justifyContent: "space-around"
  }
};

export default function Biometric(prop) {
  const [swtch, setSwtch] = React.useState(false)
  const [Right, setRight] = React.useState("")
  const [btn, setbtn] = React.useState(true)
  const [image, setimage] = React.useState("")
  const [imgSrc, setimgSrc] = React.useState("")
  const [scn, setScn] = React.useState(false)
  const { setObj } = React.useContext(StateContext)
  let handleNext = prop.next
  const handleModalNext = React.useCallback(() => {
    handleNext()
    stopScan()
  }, [handleNext])

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
      thumbHash: Right,
      imageHash: image
    }
    setObj("biometric", data)
    handleModalNext()
  }

  const Fingerscanner = window.Fingerprint


  class ScannerSdk {
    constructor() {
      this.sdk = new Fingerscanner.WebApi()

      this.sdk.onSamplesAcquired = function (s) {
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
    console.log(data)
    setRight(data)
  }
  function stopScan() {
    var scn = new ScannerSdk()
    scn.stopCapture()
  }

  React.useEffect(() => {
    var scn = new ScannerSdk()
    scn.startCapture()
  }, [swtch])

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
        <div style={{ width: 120, height: 130, borderRadius: "10%", backgroundColor: swtch ? "green" : "", border: "1px solid red" }} >
          <img src={Right} id="thumb" style={{ textAlign: "center", fontSize: "small", fontWeight: "bold", borderRadius: "10%" }} alt="Place your Right Thumb on the scanner" width="120" height="130px" />
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
                  console.log(imageSrc)
                }}
              >
                Snap
              </Button>
            )}
          </Webcam>
        </div>

      </div>
      <Grid p={2} sm={12} item >
        <Grid container gap={4} mb={2} >
          <Button onClick={() => { }} variant='contained' sx={{ minWidth: 12 }} size='small' >Scan</Button>
          <Input sx={{ width: "200px" }} onChange={(e) => imgPreview(e)} multiple type="file" />
        </Grid>
        <Grid>
          {true ? <img src={"imgSrc"} id="preview" width="100%" height="150" /> : <Stack sx={{ color: 'grey.500', alignItems: "center" }} spacing={2}>
            <p>Waiting for Scanner peripherals...</p>
            <CircularProgress color="secondary" /></Stack>}
        </Grid>
      </Grid>
      <Button disabled={btn} onClick={updateBio} size="small" disableElevation sx={{ width: 200, marginLeft: "33%" }} variant='contained' fullWidth={true} color="primary" >Save and continue</Button>
    </Box>

  );
}
const videoConstraints = {
  width: 100,
  facingMode: { exact: "environment" },
  height: 150,
  facingMode: "user"
};