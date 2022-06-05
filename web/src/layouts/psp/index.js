import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import pspVeiws from "./view"
import IconButton from '@mui/material/IconButton';



import DataTable from "examples/Tables/DataTable";

// Data


import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useEffect, useState, useContext} from "react";
import ModalBox from "./modal";
import PspVeiws from "./view";
import config from "../../config"
import { StateContext } from "store/store";



const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
        <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
            {title}
        </MDTypography>
        <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
);


function PSPList() {
    const { psp } = useContext(StateContext)

    const rows = psp.map(obj => {
        return {
            name: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {obj.fullName}
                </MDTypography>
            ),
            email: <Job title={obj.email} />,
            paypoint: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {obj.paypoint}
                </MDTypography>
            ),
            phone: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {obj.phone}
                </MDTypography>
            ),
            balance: (
                <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                    {obj.pspInfo && obj.pspInfo.disbursment}
                </MDTypography>
            ),
            action: (
                <MDBox ml={-1}>
                    <IconButton size="small" aria-label="delete">
                        <PspVeiws
                            id={obj._id}
                        />
                    </IconButton>
                </MDBox>
            ),
        }
    })


  

    const columns = [
        { Header: "Name", accessor: "name", align: "left" },
        { Header: "Email", accessor: "email", align: "left" },
        { Header: "No of Paypoint", accessor: "paypoint", align: "center" },
        { Header: "Phone", accessor: "phone", align: "center" },
        { Header: "Balance", accessor: "balance", align: "center" },
        { Header: "Action", accessor: "action", align: "center" },
    ]

    useEffect(() => {
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container flexDirection={"column"} spacing={0}>

                    {rows.length == 0 ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 400, flexDirection: "column" }} >
                            <h3>Psps list will appear here</h3>
                        </div> :
                        <Grid item xs={12}>
                            <Card>
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
                            <Footer />
                        </Grid>}
                    <ModalBox />
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}
export default PSPList;
