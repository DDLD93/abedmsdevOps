import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Grid, Typography } from '@mui/material';
import { StateContext } from './context/context';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const {clearIndexDB} = React.useContext(StateContext)

    return (
        <div>

            <PowerSettingsNewIcon onClick={handleOpen} />
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
                    <Box sx={style}>
                        <Typography textAlign="center" variant='h6' component="p" >Are sure you want to logout</Typography>
                        <Typography textAlign="center" variant='caption' component="p" >All UnSync data will be pernanetly lost</Typography>
                        <Grid container justifyContent="space-around" sx={{ mt: 3 }} >
                            <Button size='small' variant='outlined' >CANCLE</Button>
                            <Button size='small' variant='contained' onClick={() => {
                                clearIndexDB()
                                localStorage.clear()
                                window.location.reload(false)
                            }}>YES</Button>

                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
