import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import config from "../../config"


import Typography from '@mui/material/Typography';
import MDButton from 'components/MDButton';
import { Grid } from '@mui/material';

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

export default function DeleteModal(prop) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let handleNext = prop.refresh
    const handleRefresh = React.useCallback(() => {
      handleNext()
    }, [prop.refresh])

    const deleteBatch = () => {
        let url = `${config.EndPionts}/sheet/${prop.id}`
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "Applicatio/json"
            }
        }).then(res => res.json()).
            then(res => {
                handleRefresh()
                handleClose()
            })
    }

    return (
        <div>
            <IconButton onClick={handleOpen} size="small" aria-label="delete">
                <DeleteIcon />
            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
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
                        <Typography textAlign="center" variant="h6" component="h2">
                            Are you sure you want to delete this Entry
                        </Typography>
                        <Typography textAlign="center" component="p" sx={{ mt: 2, fontSize: "small" }}>
                            This will delete all beneficiaries linked to this entry
                        </Typography>
                        <Grid mt={5} container justifyContent="space-around" >
                            <MDButton onClick={handleClose} color="primary" size="small" >Cancel</MDButton>
                            <MDButton onClick={deleteBatch} variant="gradient" color="primary" size="small" >Confirm</MDButton>

                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}