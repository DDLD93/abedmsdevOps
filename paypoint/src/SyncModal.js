import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Typography } from '@mui/material';
import { StateContext } from './context/context';
import LinearWithValueLabel from './ProgressBar';
import {useNetworkState} from 'react-use';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #fff',
    boxShadow: 24,
    p: 4,
};

export default function SyncModal(prop) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [loading, setLoading] = React.useState(false)
    const [progress, setProgress] = React.useState(0)
    const [message, setMessage] = React.useState("false")
    const { clearIndexDB } = React.useContext(StateContext)
    const state = useNetworkState();
    let syncFunc = prop.syncFunc

    const sync = () => {
        setLoading(true)
        setTimeout(() => {
            handleOpen()
            setProgress(10)
            setTimeout(() => {
                setMessage("Fetching Processed List")
                setProgress(25)
                setTimeout(() => {
                    setMessage("Uploading to database")
                    setTimeout(() => {
                        if(state.online){
                            setProgress(70)
                            setLoading(false)
                            syncFunc()
                            setTimeout(() => {
                                setProgress(90)
                                setMessage("Finallizing")
                                setOpen(false)
                            },1000);


                        }else{
                            setProgress(30)
                            setMessage("No internet connection found")
                        }
                    },2000);
                },2000);
            },2000);
        }, 1000);
    }

    return (
        <div>
            <LoadingButton loading={loading} onClick={sync} sx={{ height: "30px" }} variant='contained' >Sync</LoadingButton>
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
                        <Grid container justifyContent="space-around" >
                            <Typography>{message}</Typography>
                        <LinearWithValueLabel value={progress}/>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
