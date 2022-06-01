import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import * as React from 'react';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import DataTable from "examples/Tables/DataTable";

// Data


import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import ModalBox from "./modal";
import Views from "./view";
import MDProgress from "components/MDProgress";
import { TextField, Typography } from "@mui/material";
import MDButton from "components/MDButton";
import { StateContext } from "store/store";





function UserList() {
    
    const {rows} = React.useContext(StateContext)

  




  

    const columns = [
        { Header: "Code", accessor: "code", width: "25%", align: "left" },
        { Header: "Name", accessor: "name", align: "center" },
        { Header: "No States", accessor: "states", align: "center" },
        { Header: "Completion", accessor: "completion", align: "center" },
        { Header: "Status", accessor: "status", align: "center" },
        // { Header: "Start Date", accessor: "start", align: "center" },
        { Header: "Close Date", accessor: "close", align: "center" },
        { Header: "Action", accessor: "action", align: "center" },
    ]

    useEffect(() => {
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container flexDirection={"row"} spacing={0}>


                    {rows.length == 0 ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 400, flexDirection: "column" }} >
                            <h3>Batch list will appear here</h3>
                        </div> :
                        <Grid gap={1} wrap="nowrap" container flexDirection={"row"} item xs={12}>

                            {/* <Grid item xs={4}>
                                <Card sx={{ width: 300, p: 2, pl: 3, pr: 3 }} >
                                    <Typography textAlign="center" marginBottom={2} variant="p" component="caption">
                                        Add Batch
                                    </Typography>
                                    <Grid gap={2} container>
                                    <Grid item sm={12} >
                                        <TextField onChange={(e) => setName(e.target.value)} size='small' fullWidth label="Batch Name" />
                                    </Grid>
                                    <Grid item sm={6} >
                                        <TextField
                                            onFocus={() => setfocus(true)}
                                            onBlur={() => setfocus(false)}
                                            size="small"
                                            onChange={(e) => {
                                                if (e.target.value) setDate(e.target.value);
                                                else setDate(false);
                                            }}
                                            type={date || focus ? "date" : "text"}
                                            label="Closing Date"
                                            variant="outlined"
                                        />

                                    </Grid>
                                    <Grid item sm={5} >
                                        <TextField
                                            type="number"
                                            size="small"
                                            label="Total"
                                            defaultValue={123}
                                            variant="outlined"

                                        />
                                        <ModalBox/>

                                    </Grid>
                                    <MDButton sx={{mt:4}} fullWidth size="small" color="primary">Add Batch</MDButton>
                                    </Grid>
                                </Card>
                            </Grid> */}
                            <Grid item xs={12} >
                                <Card >
                                    <MDBox pt={1}>
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

                        </Grid>}
                        
                                            <ModalBox/>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}
export default UserList;
