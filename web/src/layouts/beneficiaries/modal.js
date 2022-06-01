import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import MDButton from 'components/MDButton';
import Webcam from 'webcam-easy';
import "./style.css"
import { Grid } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';


const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: "90%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 4,
    pb: 4,
    pr: 8,
    pl: 8
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
  const [Switch, setSwitch] = React.useState(true)
  const [Left, setleft] = React.useState("")
  const [Right, setRight] = React.useState("")
  const handleOpen = () => {
    startScan()
    setOpen(true)
  };
  let startScanner = null
  const handleClose = (prop) => {
    stopScan()
    prop.reFetch
    setOpen(false)
  };



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
        return console.log('Error al comenzar la captura de huella')
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
    var thumbOne = document.getElementById("thumbOne")
    var thumbTwo = document.getElementById("thumbTwo")
    // if(currentFormat === Fingerprint.SampleFormat.PngImage){   
    // // If sample acquired format is PNG- perform following call on object received 
    // // Get samples from the object - get 0th element of samples as base 64 encoded PNG image         
    
    let samples = JSON.parse(s.samples);
    let data = "data:image/png;base64," + Fingerscanner.b64UrlTo64(samples[0])
    console.log(Right )
    if (Switch) {
      setRight(data)
      setSwitch(!Switch)  
    } else {
      setleft(data)
    }

  }

  var webcam = null
  function startFeed() {
    const webcamElement = document.getElementById('webcam');
    const canvasElement = document.getElementById('canvas');
    webcam = new Webcam(webcamElement, 'user', canvasElement);
    webcam.start().then(result => {
      console.log("webcam started");
    })
      .catch(err => {
        console.log(err);
      });
  }
  function snap() {
    let picture = webcam.snap();
    console.log(picture)

  }
  function stop() {
    webcam.stop()
  }
  function startScan() {
    var scn = new ScannerSdk()
    scn.startCapture()
  }
  function stopScan() {
    var scn = new ScannerSdk()
    scn.stopCapture()
  }
  React.useEffect(() => {


  }, [])

  return (
    <div>
      <IconButton size='large' onClick={handleOpen} aria-label="fingerprint" color="secondary">
        <Fingerprint />
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
            <Typography textAlign="center" id="transition-modal-title" variant="h4" component="h2">
              Biometric Capture
            </Typography>
            <Typography textAlign="center" variant="p" component="h6">
              {prop.name}
            </Typography>
            <div style={style.card} >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 10 }} >
                <div className='flickr' style={{ width: 100, height: 120, backgroundColor: "red" }} >
                  <img id="thumbOne" width="100" height="120" src={Right} />
                </div>
                <div className='flickr' style={{ width: 100, height: 120, backgroundColor: "red" }} >
                  <img id="thumbTwo" width="100" height="120" src={Left} />
                </div>

              </div>
              <div style={{ display: "flex", flexDirection: "column" }} >
                <video style={{ width: 300, height: 250, }} id="webcam" ></video>
                <canvas style={{ width: 300, height: 250, position: "absolute" }} id="canvas" ></canvas>
                <Grid container sx={{
                  ci
                }} gap={2} justifyContent="center" >
                  <button onClick={startFeed} >Start Camera</button>
                  <button onClick={snap} >Capture</button>
                  <button onClick={stop} >Stop</button>

                </Grid>
              </div>

            </div>

            <MDButton sx={{ mt: 4 }} size="small" fullWidth={true} variant="gradient" color="primary" >Save</MDButton>
            
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}