import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import config from '../../config';
import { Card, Grid, IconButton, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CloseIcon from '@mui/icons-material/Close';

import { StateContext } from 'store/store';

export default function Profile(prop) {
    const [open, setOpen] = React.useState(false);
    const { notification, token } = React.useContext(StateContext)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    let handleNext = prop.refresh
    const handleRefresh = React.useCallback(() => {
        handleNext()
    }, [prop.refresh])

    function approveStatus() {
        let data = {
            sheetId: prop.id,
            status: "processing"
        }
        console.log(data)
        fetch(`${config.EndPionts}/sheet/approve`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(data)
        }).then(res => (res.json())).
            then(res => {
                notification("success", "List has been successfully Approved")
                handleRefresh()
                handleClose()
            })
    }
    function rejectStatus() {
        let data = {
            sheetId: prop.id,
            status: "rejected"
        }
        fetch(`${config.EndPionts}/sheet`, {
            method: "POST",
            headers: {
                "x-auth-token": token,
            },
            body: JSON.stringify(data)
        }).then(res => (res.json())).
            then(res => {
                notification("success", "List has been successfully Approved")
                handleRefresh()
                handleClose()
            })
    }
    const descriptionElementRef = React.useRef(null);
    // async function createFile() {
    //     let response = await fetch('http://localhost:9000/api/uploads/bafb51012d574c8ab33687fb9bfd5414.xlsx');
    //     let data = await response.blob();
    //     let metadata = {
    //         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    //     };
    //     let file = new File([data], "temp.xlsx", metadata);
    //     // ... do something with the file or return it
    //     const result = excelToJson({
    //         sourceFile: file,
    //         header: {
    //             rows: 4,
    //         }
    //     });
    //     console.log(result)
    // }
    React.useEffect(() => {
        let image = prop.avatar 
        console.log(image)
    })
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);
    const columns = [
        { field: 'Name', headerName: 'Name', width: 200, sortable: false },
        { field: 'Gender', headerName: 'Gender', sortable: false, },
        { field: 'Phone', headerName: 'Phone', width: 120, color: "blue" },
        { field: 'State', headerName: 'State', sortable: false, },
        { field: 'LGA', headerName: 'lga', sortable: false, },
        { field: 'Ward', headerName: 'Geo-Political Zone', sortable: false, },
        { field: 'Status', headerName: 'Status', sortable: false, },
    ];
    //   const rows = bene.map(obj=>{
    //     return {id: obj._id, Name:obj.fullName, Gender:obj.gender,Phone:obj.phone,Occupation:obj.occupation,Batch:obj.batch,Disability:obj.disability,State:obj.state,lga:obj.lga,Status:obj.status,onCellClick: ()=>console.log("first")}

    //   })


    return (
        <div>
            <IconButton onClick={handleClickOpen} size="small" aria-label="delete">
                <VisibilityIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={'body'}
                aria-labelledby="Sheet Preview"
                aria-describedby="Sheet Preview"
            >
                <CloseIcon
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        top: "5px",
                        left: "10px",
                        cursor: "pointer",
                        color: "red"
                    }}
                />
                <DialogTitle sx={{ textAlign: "center" }} >{prop.code}</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}>
                        <Card sx={{ display: "flex", flexDirection: "row", width: 550, height: 300, p: 2 }}>
                            <img src={prop.avatar} style={{ marginRight: "20px", border: "1px solid red", borderRadius: "50%", marginBottom: "10px" }} alt="avatar" width="150" height="150" />
                            <div>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Name</span>: <em style={{ color: "#000" }} >{prop.fullName}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Age</span>: <em style={{ color: "#000" }} >{prop.age}</em> </p>
                                <p style={{ fontSize: "12px", textAlign: "start" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Code</span>: {prop.code}</p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Gender</span>: <em style={{ color: "#000" }} >{prop.gender}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >State</span>: <em style={{ color: "#000" }} >{prop.state}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >LGA</span>: <em style={{ color: "#000" }} >{prop.lga}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Ward</span>: <em style={{ color: "#000" }} >{prop.ward}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Marital Status</span>: <em style={{ color: "#000" }} >{prop.maritalStatus}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Occupation</span>: <em style={{ color: "#000" }} >{prop.occupation}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Biometric</span>: <em style={{ color: "#000" }} >{null}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Status</span>: <em style={{ color: "#000" }} >{prop.status}</em> </p>
                            </div>
                        </Card>
                        <Card sx={{ mt:2, mb:3, display: "flex", width: 550, height: 400, p: 2 }}>
                            <div>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder" , marginRight:"5px"}} >Payment Type</span>: <em style={{ color: "#000" }} >{prop.methodOfPayment}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Payment Details</span>: <em style={{ color: "#000" }} >{prop.remark}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Amount</span>: <em style={{ color: "#000" }} >{prop.remark?20000:""}</em> </p>
                                <p style={{ fontSize: "12px", textAlign: "start" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >PSP</span>: {prop.code}</p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder" , marginRight:"5px"}} >Paypoint</span>: <em style={{ color: "#000" }} >{}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder" , marginRight:"5px"}} >Location</span>: <em style={{ color: "#000" }} >{}</em> </p>
                                <p style={{ fontSize: "12px" }} ><span style={{ fontWeight: "bolder", marginRight:"5px" }} >Time Stamps</span>: <em style={{ color: "#000" }} >{}</em> </p>
                            </div>
                            <img src={prop.paymentProof} style={{ marginTop: "20px", border: "1px solid red", borderRadius: "5%", marginBottom: "10px" }} alt="payment proof" width="400" height="200" />
                        </Card>
                        <TextField fullWidth variant='outlined' label="Remark"  ></TextField>

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={rejectStatus}>Reject</Button>
                    <Button onClick={approveStatus}>Approve</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
