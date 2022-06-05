import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import BackupIcon from '@mui/icons-material/Backup';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react'

// Data


import MDBadge from "components/MDBadge";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useEffect, useState } from "react";
import { Button, Fab, Input, TextField } from "@mui/material";
import MDButton from "components/MDButton";
import { StateContext } from "store/store";
import DeleteModal from "./delete";
import config from "../../config"
import SheetPreview from "./preview";





function Sheets() {
    const [file, setfile] = useState(null)
    const [importCondition, setimportCondition] = useState(false)
    const [rows, setrows] = useState([])
    const [batch, setbatch] = useState([])
    const { batchList, token,notification,user } = useContext(StateContext)

    const fetchSheet = () => {
        let url = `${config.EndPionts}/sheet/`
        setrows([])
        fetch(url)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                response.map(obj => {
                    let object = {
                        code: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.code}
                            </MDTypography>
                        ),
                        timeStamp: (
                            <>
                                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                    {obj.createdAt.split("T")[0]}
                                </MDTypography>
                                <br />
                                <MDTypography sx={{ fontSize: "8px" }} component="a" href="#" variant="a" color="text" fontWeight="medium">
                                    {obj.createdAt.split("T")[1]}
                                </MDTypography>
                            </>
                        ),
                        entries: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.total}
                            </MDTypography>
                        ),
                        valid: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.valid}
                            </MDTypography>
                        ),
                        status: (
                            <MDBox ml={-1}>
                                <MDBadge badgeContent={obj.status} color={obj.status == "valid" ? "success" : "error"} variant="gradient" size="sm" />
                            </MDBox>
                        ),
                        action: (
                            <MDBox sx={{ display: "flex" }} ml={-1}>
                                {user.userType ==="admin"&&<SheetPreview
                                refresh={fetchSheet}
                                id={obj._id}
                                code={obj.code}
                                total={obj.total}
                                valid={obj.valid}
                                invalid={obj.invalid}
                                uploadBy={obj.uploadedBy && obj.uploadedBy.fullName}
                                timestamps={obj.createdAt}
                                status={obj.status}
                                />}
                                {user.userType ==="admin"&&<DeleteModal
                                    id={obj._id}
                                    refresh={fetchSheet}
                                />}
                            </MDBox>
                        ),
                    }
                    setrows(prev => [...prev, object])
                })
            })
    }



    const postXLSX = () => {
        let form = new FormData
        form.append("xlsx", file)
        console.log(file)
        fetch(`${config.EndPionts}/sheet/`, {
            headers: {
                "Authorization": "Bearer "+ token,
                },
            method: 'POST',
            body: form

        })
            .then(res => (res.json()))
        .then(obj => {
            notification("warning","New List added pending review")
            setfile(null)
            setbatch(prev => [...prev, obj])
            let object = {
                code: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {obj.code}
                    </MDTypography>
                ),
                timeStamp: (
                    <>
                        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            {obj.createdAt.split("T")[0]}
                        </MDTypography>
                        <br />
                        <MDTypography sx={{ fontSize: "8px" }} component="a" href="#" variant="a" color="text" fontWeight="medium">
                            {obj.createdAt.split("T")[1]}
                        </MDTypography>
                    </>
                ),
                entries: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {obj.total}
                    </MDTypography>
                ),
                valid: (
                    <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                        {obj.valid}
                    </MDTypography>
                ),
                status: (
                    <MDBox ml={-1}>
                        <MDBadge badgeContent={obj.status} color={obj.status == "valid" ? "success" : obj.status == "processing" ? "warning" :"error"} variant="gradient" size="sm" />
                    </MDBox>
                ),
                action: (
                    <MDBox sx={{ display: "flex" }} ml={-1}>

                        <DeleteModal
                            id={obj._id}
                            reFetch={() => {
                                let idx = e.target.parentElement.id
                                setrows(rows.filter((item, index) => index != idx))
                            }}
                        />
                    </MDBox>
                ),
            }
            setrows(prev => [...prev, object])
        }).catch(err=>notification("error",err.message  )
        )
}




const columns = [
    { Header: "Code", accessor: "code", align: "left" },
    { Header: "TimeStamp", accessor: "timeStamp", align: "center" },
    { Header: "Entries", accessor: "entries", align: "center" },
    { Header: "Valid", accessor: "valid", align: "center" },
    { Header: "status", accessor: "status", align: "center" },
    { Header: "Action", accessor: "action", align: "center" },

]
useEffect(() => {
    fetchSheet()
}, [])

return (
    <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
            <Grid container flexDirection={"column"} spacing={0}>
                <Grid item xs={12}>
                    <Card>
                       {user.userType ==="admin"&& <Grid container sx={{ alignItems: "flex-end", justifyContent: "flex-end", gap: 2 }} >
                            {/* <TextField
                                select
                                label="Batch"
                                sx={{ width: 100 }}
                                value={batch}
                                onChange={(e) => setbatch(e.target.value)}
                                SelectProps={{
                                    native: true,
                                }}
                                size='small'
                            >
                                {batchList.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {`${option.name}/${option.code}`}
                                    </option>
                                ))}
                            </TextField> */}
                            <Input sx={{ width: "200px" }} onChange={(e) => setfile(e.target.files[0])} multiple type="file" />
                            <MDButton disabled={file ? false : true} color="primary" onClick={postXLSX} size="small" sx={{ mr: 5, mt: 3 }} variant="contained">
                                Upload
                            </MDButton>

                        </Grid>}
                        <MDBox pt={3}>
                            <DataTable
                                table={{ columns, rows }}
                                isSorted={false}
                                entriesPerPage={false}
                                showTotalEntries={false}
                                noEndBorder
                            />
                        </MDBox>
                    </Card>
                </Grid>
            </Grid>
        </MDBox>
        <Footer />
    </DashboardLayout>
);
}
export default Sheets;