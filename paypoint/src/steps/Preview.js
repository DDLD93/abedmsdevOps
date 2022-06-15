import * as React from 'react';
import { useCallback } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Buffer } from 'buffer';
import { styled } from '@mui/material/styles';


import { Alert, AlertTitle, Button, Card, CircularProgress, Grid, LinearProgress, Stack, TextField } from '@mui/material';
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

export default function Preview(prop) {
    const { token, setObj } = React.useContext(StateContext)
    let handleNext = prop.next
    let id = prop.user
    const handleModalNext = React.useCallback(() => {
        handleNext()
    }, [handleNext])

    const updateBio = () => {
        console.log(id)
        setObj("done ", true, id)
        handleModalNext()
    }


    React.useEffect(() => {


    }, [])

    return (
        < Box container sx={style.modal} >
            <Button onClick={updateBio} size="small" disableElevation sx={{ width: 200, marginTop: 8, marginLeft: "28%" }} variant='contained' fullWidth={true} color="primary" >Save and Close</Button>
        </Box >
    )
}
