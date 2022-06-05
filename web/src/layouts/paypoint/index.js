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
import BlockIcon from '@mui/icons-material/Block';
import IconButton from '@mui/material/IconButton';



import DataTable from "examples/Tables/DataTable";

// Data


import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import ModalBox from "./modal";
import ViewsBox from "./veiws";
import config from "../../config"






function PaypointList() {
    const [rows, setrows] = useState([])
    const erows = () => fetchUsers()
    const fetchUsers = () => {
        setrows([])
        fetch(`${config.EndPionts}/paypoint`)
            .then(res => res.json())
            .then(response => {
                response.map(obj => {
                    let object = {
                        name: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.fullName}
                            </MDTypography>
                        ),
                        email: <Job title={obj.email} />,
                        assignedWards: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                            {obj.assignedWards}
                        </MDTypography>
                        ),
                        phone: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.phone}
                            </MDTypography>
                        ),
                        location: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.location}
                            </MDTypography>
                        ),
                        action: (
                            <MDBox sx={{display:"flex"}} ml={-1}>
                                <IconButton size="small" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton size="small" aria-label="delete">
                                    <BlockIcon />
                                </IconButton>
                              <ViewsBox
                              terminal={obj.fullName}
                              location={obj.location}
                              id={obj._id}
                                />
                            </MDBox>
                        ),

                    }
                    setrows(prev => [...prev, object])
                })
            })
    }

    const Job = ({ title, description }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                {title}
            </MDTypography>
            <MDTypography variant="caption">{description}</MDTypography>
        </MDBox>
    );
    const stateList = [
        "",
        "abia",
        "adamawa",
        "akwa Ibom",
        "anambra",
        "bauchi",
        "bayelsa",
        "benue",
        "borno",
        "cross River",
        "delta",
        "ebonyi",
        "edo",
        "ekiti",
        "enugu",
        "abuja",
        "gombe",
        "imo",
        "jigawa",
        "kaduna",
        "kano",
        "katsina",
        "kebbi",
        "kogi",
        "kwara",
        "lagos",
        "nasarawa",
        "niger",
        "ogun",
        "ondo",
        "osun",
        "oyo",
        "plateau",
        "rivers",
        "sokoto",
        "taraba",
        "yobe",
        "zamfara"
      ]

    const columns = [
        { Header: "Name", accessor: "name", align: "left" },
        { Header: "Email", accessor: "email", align: "left" },
        { Header: "Assignment", accessor: "assignedWards", align: "center" },
        { Header: "Phone", accessor: "phone", align: "center" },
        { Header: "Location", accessor: "location", align: "center" },
        { Header: "Action", accessor: "action", align: "center" },
    ]

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container flexDirection={"column"} spacing={0}>

                    {rows.length == 0 ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 400, flexDirection: "column" }} >
                            <h3>Paypoint list will appear here</h3>
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
                    <ModalBox 
                    setRows={erows}
                    />
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}
export default PaypointList;
