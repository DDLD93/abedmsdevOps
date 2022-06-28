import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import LinearProgress from '@mui/material/LinearProgress';
import DataTable from "examples/Tables/DataTable";

// Data


import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useContext, useEffect, useState } from "react";
import ModalBox from "./modal";
import { TextField } from "@mui/material";
import config from "../../config"

import { StateContext } from "../../store/store"








function Biometric() {
    const [rows, setrows] = useState([])
    const [loading, setloading] = useState(false)
    const [lga, setlga] = useState("lga")
    const [batch, setbatch] = useState("batch")
    const [state, setstate] = useState("state")
    const { batchList } = useContext(StateContext)





    const fetchBene = () => {
        let url = `${config.EndPionts}/beneficiaries/`
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(response => {
                console.log(response)
                response.map(obj => {
                    console.log(obj.isBioCaptured)
                    let object = {
                        author: (<MDTypography component="a" href="#" variant="p" color="text" fontWeight="medium">
                            {obj.fullName}
                        </MDTypography>),
                        function: <Job title={obj.state} description={obj.LGA} />,
                        status: (
                            <MDBox ml={-1}>
                                <MDBadge badgeContent={obj.isBioCaptured ? "captured" : "Not captured"} color={obj.isBioCaptured ? "success" : "error"} variant="gradient" size="sm" />
                            </MDBox>
                        ),
                        employed: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.phone}
                            </MDTypography>
                        ),
                        action: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.code}
                            </MDTypography>
                        ),
                        // payment: (
                        //     <MDBox ml={-1}>
                        //         <MDBadge badgeContent={obj.isPaid} color={obj.isPaid == "approved" ? "success" : "error"} variant="gradient" size="sm" />
                        //     </MDBox>
                        // ),
                        capture: (
                            <MDBox sx={{display:"flex"}} ml={-1}>
                                    <ModalBox
                                    name={obj.fullName}
                                    id={obj._id}
                                    />
                            </MDBox>
                        ),
                    }
                    setrows(prev => [...prev, object])
                })
            }).catch(err => console.log(err))
    }

    const Job = ({ title, description }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                {title}
            </MDTypography>
            <MDTypography variant="caption">{description}</MDTypography>
        </MDBox>
    );
    const lgaList = [
        {
            value: "kagarko",
            label: "Kagarko"
        },
        {
            value: "chikun",
            label: "Chikun"
        }
    ]
    const stateList = [
        {
            value: "kano",
            label: "Kano"
        },
        {
            value: "jigawa",
            label: "Jigawa"
        }
    ]

    const columns = [
        { Header: "Name", accessor: "author", width: "25%", align: "left" },
        { Header: "Code", accessor: "action", align: "center" },
        { Header: "State", accessor: "function", align: "left" },
        { Header: "Status", accessor: "status", align: "center" },
        { Header: "Phone", accessor: "employed", align: "center" },
        { Header: "Action", accessor: "capture", align: "center" },
    ]

    useEffect(() => {

        fetchBene()


    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container flexDirection={"column"} spacing={0}>

                    {loading == true ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 400, flexDirection: "column" }} >
                            <Box sx={{ width: "200px" }}>
                                <LinearProgress color="secondary" />
                            </Box>

                        </div> :
                        <Grid item xs={12}>
                            <Card>
                                <MDBox pt={3}>
                                    <Grid container sx={{ justifyContent: "center", gap: 3 }} >
                                        <TextField
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
                                                <option key={option.code} value={option.code}>
                                                    {`${option.name}/${option.code}`}
                                                </option>
                                            ))}
                                        </TextField>                                        <TextField
                                            select
                                            label="State"
                                            sx={{ width: 100 }}
                                            value={state}
                                            onChange={(e) => setstate(e.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            size='small'
                                        >
                                            {stateList.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>                                        <TextField
                                            select
                                            label="LGA"
                                            sx={{ width: 100 }}
                                            value={lga}
                                            onChange={(e) => setlga(e.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            size='small'
                                        >
                                            {lgaList.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                        <TextField sx={{ width: 200, ml: 4 }} placeholder="Name Phone BVN NIN" size="small" label="Search" />


                                    </Grid>
                                    <DataTable
                                        table={{ columns, rows }}
                                        isSorted={false}
                                        entriesPerPage={false}
                                        showTotalEntries={true}
                                        canSearch={false}
                                        noEndBorder
                                    />
                                </MDBox>
                            </Card>
                        </Grid>}


                </Grid>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout>
    );
}
export default Biometric;