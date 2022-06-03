import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import config from '../../config';
import { Grid, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import excelToJson from 'convert-excel-to-json'
import CloseIcon from '@mui/icons-material/Close';

import { StateContext } from 'store/store';

export default function SheetPreview(prop) {
    const [open, setOpen] = React.useState(false);
    const {notification,token} = React.useContext(StateContext)
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
            sheetId:prop.id,
            status:"processing"
        }
        console.log(data)
        fetch(`${config.EndPionts}/sheet/approve`,{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token,
            },
            body:JSON.stringify(data)
        }).then(res=>(res.json())).
        then(res=>{
            notification("success","List has been successfully Approved")
            handleRefresh()
            handleClose()
        })
    }
    function rejectStatus() {
        let data = {
            sheetId:prop.id,
            status:"rejected"
        }
        fetch(`${config.EndPionts}/sheet`,{
            method:"POST",
            headers: {
                "x-auth-token": token,
            },
            body:JSON.stringify(data)
        }).then(res=>(res.json())).
        then(res=>{
            notification("success","List has been successfully Approved")
            handleRefresh()
            handleClose()
        })
    }
    const descriptionElementRef = React.useRef(null);
    async function createFile(){
        let response = await fetch('http://localhost:9000/api/uploads/bafb51012d574c8ab33687fb9bfd5414.xlsx');
        let data = await response.blob();
        let metadata = {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        };
        let file = new File([data], "temp.xlsx", metadata);
        // ... do something with the file or return it
        const result = excelToJson({
            sourceFile: file,
            header: {
              rows: 4,
            }
          });
          console.log(result)
     }
      React.useEffect(() => {
        createFile()
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
        {field: 'Name', headerName: 'Name', width: 200, sortable: false},
        {field: 'Gender', headerName: 'Gender', sortable: false,},
        {field: 'Phone', headerName: 'Phone',width: 120, color:"blue"},
        {field: 'State', headerName: 'State', sortable: false,},
        {field: 'LGA', headerName: 'lga', sortable: false,},
        {field: 'Ward', headerName: 'Geo-Political Zone', sortable: false,},
        {field: 'Status', headerName: 'Status', sortable: false,},
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
          sx={{position:"absolute",
                top:"5px",
               left:"10px",
               cursor:"pointer",
               color:"red" 
             }}
          />
                <DialogTitle sx={{textAlign:"center"}} >{prop.code}</DialogTitle>
                <Grid p={2} gap={16} container flexDirection="row" >
                    <div>
                        <div>
                            <span style={{ fontSize: "13px", color: "grey" }} >Total Entry :</span> <span style={{ fontSize: "13px", fontWeight: "bold" }} >{prop.total}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: "13px", color: "grey" }} >Valid Entry :</span> <span style={{ fontSize: "13px", fontWeight: "bold" }} >{prop.valid}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: "13px", color: "grey" }} >Invalid Entry :</span> <span style={{ fontSize: "13px", fontWeight: "bold" }} >{prop.invalid}</span>
                        </div>

                    </div>
                    <div>
                        <div>
                            <span style={{ fontSize: "13px", color: "grey" }} >Uploaded by :</span> <span style={{ fontSize: "13px", fontWeight: "bold" }} >{prop.uploadBy}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: "13px", color: "grey" }} >Status :</span> <span style={{ fontSize: "13px", fontWeight: "bold" }} >{prop.status}</span>
                        </div>
                        <div>
                            <span style={{ fontSize: "13px", color: "grey" }} >TimeStamps :</span> <span style={{ fontSize: "13px", fontWeight: "bold" }} >{prop.timestamps}</span>
                        </div>
                    </div>

                </Grid>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}>
                            {/* <button style={{padding:5,marginLeft:"40%"}} ><a href={`${config.EndPionts}/uploads/5de5da118fee4ae7923b2e77a7dec173.xlsx`}>download sheet</a></button> */}
                            <DataGrid  columns={columns} rows={[]} />
                    
                           
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button  color="secondary" onClick={rejectStatus}>Reject</Button>
                    <Button onClick={approveStatus}>Approve</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
