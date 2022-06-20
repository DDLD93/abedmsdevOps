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
    const { object, setObj } = React.useContext(StateContext)
    let handleNext = prop.next
    let id = prop.user
    const handleModalNext = React.useCallback(() => {
        handleNext()
    }, [handleNext])

    const updateBio = () => {
        console.log(id)
        setObj("done",true, id)
        handleModalNext()
    }


    React.useEffect(() => {
        console.log(object)

    }, [])

    return (
        < Box container sx={style.modal} >
            <Grid container sx={{height:400}} gap={2} >
                <img src={object?.biometric?.imageHash} width="80" height="100" style={{border:"1px solid blue",width:"80px" ,height:"100px" }} alt="avartar" />
                <img src={object?.biometric?.thumbHash}  width="80" height="100" style={{border:"1px solid blue",width:"80px" ,height:"100px" }} alt="thumb" />
                <img src={object?.payment?.imageHash} width="80" height="100" style={{border:"1px solid blue",width:"80px" ,height:"100px" }} alt="payment" />
            </Grid>
            <Grid alignItems="center"  gap={5} m={0} p={0} container >
                <Grid gap={1} >
                    <Field
                        field={"Full Name"}
                        value={prop.fullName}
                    />
                    <Field
                        field={"Gender"}
                        value={prop.gender}
                    />
                    <Field
                        field={"Age"}
                        value={prop.age}
                    />
                    <Field
                        field={"State"}
                        value={prop.state}
                    />
                     <Field
                        field={"Disability"}
                        value={object?.identification?.disability}
                    />
                    <Field
                        field={"ID Type"}
                        value={object?.identification?.type}
                    />
                       <Field
                        field={"Payment Method"}
                        value={object?.payment?.method}
                    />
                         <Field
                        field={"Bank"}
                        value={object?.payment?.bankName}
                    />
                </Grid>
                <Grid>
                    <Field
                        field={"LGA"}
                        value={prop.lga}
                    />
                    <Field
                        field={"Ward"}
                        value={prop.ward}
                    />
                    <Field
                        field={"Phone"}
                        value={prop.phone}
                    />
                    <Field
                        field={"Marital Status"}
                        value={prop.maritalStatus}
                    />
                    <Field
                        field={"Occupation"}
                        value={object?.identification?.occupation}
                    />
                   
                    <Field
                        field={"ID number"}
                        value={object?.identification?.idNo}
                    />
                       <Field
                        field={"Bank Name"}
                        value={object?.payment?.bankName}
                    />
                         <Field
                        field={"Account Number"}
                        value={object?.payment?.accNo}
                    />
                </Grid>
            </Grid>
            <Button onClick={updateBio} size="small" disableElevation sx={{ width: 200, marginTop: 2, marginLeft: "28%" }} variant='contained' fullWidth={true} color="primary" >Save and Close</Button>
        </Box >
    )
}
function Field({ field, value }) {
    return (
        <Grid item sx={{ minWidth: 10, mt: 0.1 }} >
            <p style={{ margin: 0, color: "black", fontWeight: "bold", fontSize: "11px", fontFamily: "cursive" }}>{field}</p>
            <hr style={{ margin: 0, marginBottom: "1px", color: "grey" }} />
            <p style={{ margin: 0, fontSize: "17px", color: "gray" }} >{value}</p>
        </Grid>
    )
}