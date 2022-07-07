import { useState,useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import config from "../../config";

export default function Logs() {
    const [logs, setLogs] = useState([])

    const LogContent = ({evt,desc,time}) => {
    let color = evt=="Account Creation"?"#0080006e":evt=="Sheet Upload"?"#035cee94":"#00c9ff91" 
    return(
        <p style={{ marginBottom: 7, backgroundColor:color, padding: 2, paddingLeft: 5, borderRadius: "5px", fontSize: "smaller" }}>
            <span style={{ fontWeight: "bold" }} >{evt}</span> <span>{desc}</span> <span>@{time}</span>
        </p>
    );
}
    useEffect(() => {
        fetch(`${config.EndPionts}/logs`).then(res => (res.json())).
            then(res => {
                console.log(res)
                setLogs(res)
            }).catch(err=>console.log(err))
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mt={6} mb={3}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} lg={10}>
                        <Card sx={{ p: 2 }}>
                            <MDBox p={2}>
                                <MDTypography variant="h5">Event Logs</MDTypography>
                            </MDBox>
                            <MDBox pt={2} px={2}>
                                {logs.map((log,index)=>(
                                    <LogContent
                                    key={index} 
                                    evt={log.event}
                                    desc={log.desc}
                                    time={log.timeStamp}
                                    />
                                ))}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout>)
}