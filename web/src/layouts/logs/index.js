import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


// Data

import { useEffect, useState, useContext, useLayoutEffect } from "react";
import { StateContext } from "store/store";








function Logs() {
    const { batchList, ageDistro } = useContext(StateContext)
 
    useLayoutEffect(() => {
       
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                
            </MDBox>
        </DashboardLayout>
    );
}
export default Logs;
