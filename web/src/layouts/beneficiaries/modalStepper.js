import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Info from './info';
import MDButton from 'components/MDButton';
import Biometric from 'layouts/biometrics/modal';
import PaymentMethod from 'layouts/payment/payment';
import { StateContext } from 'store/store';
import { Button, Grid, StepLabel } from '@mui/material';
import { Stepper } from 'react-form-stepper';



const style = {
    modal: {
        position: 'absolute',
        display: "flex",
        width: '100%',
        flexDirection: "column",
        justifyContent: "space-between",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        height: "95%",
        bgcolor: 'background.paper',
        boxShadow: 24,
    }
};

export default function ModalStepper(prop) {
    const [open, setOpen] = React.useState(false);
    const [cStep, setcStep] = React.useState(0)
    function handleNext() {
        if (cStep == 2) {
            setOpen(false)
        }
        cStep < 2 ? setcStep(prev => prev + 1) : null

    }
    function handleBack() {
       cStep > 0 ? setcStep(prev => prev - 1) : null

    }
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    // var {cStep} = React.useContext(StateContext)
    const obj = prop.user
    const stepper = [
        {
            name: "Bio Data",
            component: <Info
                code={obj.code}
                status={obj.status}
                payment={obj.isPayment}
                fullName={obj.fullName}
                gender={obj.gender}
                disability={obj.disability}
                age={obj.age}
                lga={obj.lga}
                phone={obj.phone}
                maritalStatus={obj.maritalStatus}
                id={obj._id}
                occupation={obj.occupation}
                state={obj.state}
                ward={obj.ward}
                idType={obj.identification && obj.identification.type}
                idNo={obj.identification && obj.identification.idNo}
                next={handleNext}
            />,
            index: 1
        },
        {
            name: "Biometric",
            component: <Biometric
                id={obj._id}
                handleNext={handleNext}
            />,
            index: 2
        },
        {
            name: "Payment",
            component: <PaymentMethod
                id={obj._id}
                handleNext={handleNext}
                clientName={obj.fullName}
                photo={obj.biometric && obj.biometric.imagePath}
                status={obj.status}
            />,
            index: 3
        },
    ]





    return (
        <div>
            <IconButton size='large' onClick={handleOpen} color="secondary">
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
                        <div style={{display:"flex",flexDirection:"row",justifyContent:cStep==0?"center":null, gap:"20px",height:"10px",width:"100%"}} >
                        <Button sx={{display:cStep==0?"none":"block"}} onClick={handleBack} >go back</Button>
                        <Stepper sp label='3px' style={{fontSize:8,padding:5,color:"greenyellow",width:"60%"}}
                            steps={[{ label:""}, { label:"" }, { label:""}]}
                            activeStep={cStep}
                        />
                        </div>
                        
                        {stepper[cStep].component}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


