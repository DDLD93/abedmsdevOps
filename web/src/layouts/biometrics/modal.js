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
import { Button, Grid } from '@mui/material';
import config from "../../config"
import { StateContext } from 'store/store';




const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: "80%",
    bgcolor: 'background.paper',
  },
  card: {
    display: "flex",
    gap: 3,
    width: "100%",
    padding: "25px",
    justifyContent: "space-between"
  }
};

export default function Biometric({id,handleNext}) {
  const [Switch, setSwitch] = React.useState(true)
  const [Right, setRight] = React.useState("")
  const [image, setimage] = React.useState("")
  const handleModalNext = React.useCallback(() => {
    handleNext()
    stopScan()
    stopFeed()
  }, [handleNext])
  
  
  const {notification,updateObject} = React.useContext(StateContext)
  let startScanner = null
 
  let picture = null

  const updateBio = () => {
    let data = {
      biometric:{
        thumbHash:Right.split(",")[1],
        imagePath:image
    },
    }
    updateObject(data)
    handleModalNext()
    // console.log("meta data>>>>>> ",data)
    // console.log("file data>>>>>> ",file)
    // form.append("meta", JSON.stringify(data))
    // form.append("image", image)
    // let url = `${config.EndPionts}/beneficiaries/biometric/${id}`
    // fetch(url, {
    //   method: "POST",
    //   body: form
    // }).then(res => (res.json())).
    //   then(res => {
    //     handleModalClose()
    //     console.log(res)
    //   }).
    //   catch(err => console.log("error >>>>> ", err))
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
  function dataURLtoFile(dataurl, filename) {

    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  function snap() {
    picture = webcam.snap();
    let file = dataURLtoFile(picture, "snap.png")
    setimage(file)

  }
  function stopFeed() {
    console.log("web closed")
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
  setTimeout(() => {
    startFeed()
    startScan()

  }, 1500)
  React.useEffect(() => {


  }, [])

  return (

    <Box container sx={style.modal}>
      <div style={style.card} >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "5px", flexDirection: "column", gap: 20 }} >

          <div className={Switch ? "flickr" : ""} style={{ width: 120, height: 130, borderRadius: "10%" }} >
            <img id="thumbOne" style={{ textAlign: "center", fontSize: "small", fontWeight: "bold", borderRadius: "10%" }} alt="Place your Right Thumb on the scanner" width="120" height="130px" src={Right} />
          </div>
          {/* <div className={Switch ? "" : "flickr"} style={{ width: 120, height: 130, borderRadius: "10%" }} >
            <img id="thumbTwo" style={{ textAlign: "center", fontSize: "small", fontWeight: "bold", borderRadius: "10%" }} alt="Place your Right Thumb on the scanner" width="120" height="130px" src={Left} />
          </div> */}

        </div>
        <div style={{ display: "flex", flexDirection: "column" }} >
          <video style={{ width: 300, height: 250, }} id="webcam" ></video>
          <canvas style={{ width: 300, height: 250, position: "absolute" }} id="canvas" ></canvas>
          <Grid container justifyContent="center" mt={2}>
            <Button variant="outlined" color="secondary" size="small" onClick={snap} >Capture</Button>
          </Grid>
        </div>

      </div>
      <MDButton onClick={updateBio} sx={{ mt: 4, width: 80, top: "85%", right: "15px", position: "absolute" }} size="small" fullWidth={true} variant="gradient" color="primary" >Next</MDButton>

    </Box>

  );
}