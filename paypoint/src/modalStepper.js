import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import { Button, Grid, StepLabel } from '@mui/material';
import { Stepper } from 'react-form-stepper';
import CustomStepper from './Stepper';



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

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false)
    };
    const user = prop.userObj
    
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
                     <CustomStepper
                     next={handleClose}
                     user={user}  
                     />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}


