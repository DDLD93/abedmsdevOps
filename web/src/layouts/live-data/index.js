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
import DataTable from "examples/Tables/DataTable";
import MDProgress from "components/MDProgress";
import { TextField } from "@mui/material";
import { StateContext } from "store/store";
import { Chart } from "react-google-charts";

import State from "./state";
import config from "config";
import { Chartss } from "./pspbars";
import { StateBars } from "./statebars";
import { Lines } from "./pspLines";







function LiveData() {
    const { batchList, ageDistro } = useContext(StateContext)
    const [data2, setdata2] = useState([])
    const ages = [
        ["Age Catergory", "Disbursement by Age"],
        ["North East", 10],
        ["North West", 10],
        ["North Central", 10],
        ["South East", 10],
        ["South West", 10],
        ["South South", 10],
    ]
    const disability = [
        ["Disability", "Disbursement by disablity"],
        ["None", 10],
        ["Blind", 10],
        ["Deaf", 10],
        ["Cripple", 10],
        ["Metally-impaired", 10],
    ]
    const gender = [
        ["Gender", "Disbursement by gender"],
        ["Male", 10],
        ["Female", 10],
    ]
    const maritalStatus = [
        ["Marital Status", "Disbursement by Marital Status"],
        ["Single", 10],
        ["Window", 10],
        ["Divorce", 10],
    ]
    const data = [
        ["Name", "Disbursement by state"],
        ["abia", 10],
        ["adamawa", 10],
        ["akwa Ibom", 10],
        ["anambra", 10],
        ["bauchi", 10],
        ["bayelsa", 10],
        ["benue", 10],
        ["borno", 10],
        ["cross River", 10],
        ["delta", 10],
        ["ebonyi", 10],
        ["edo", 10],
        ["ekiti", 10],
        ["enugu", 10],
        ["abuja", 10],
        ["gombe", 10],
        ["imo", 10],
        ["jigawa", 10],
        ["kaduna", 10],
        ["kano", 10],
        ["katsina", 10],
        ["kebbi", 10],
        ["kogi", 10],
        ["kwara", 10],
        ["lagos", 10],
        ["nasarawa", 10],
        ["niger", 10],
        ["ogun", 10],
        ["ondo", 10],
        ["osun", 10],
        ["oyo", 10],
        ["plateau", 10],
        ["rivers", 50],
        ["sokoto", 10],
        ["taraba", 10],
        ["yobe", 10],
        ["zamfara", 10]
    ];
    const fetchStats = () => {
        fetch(`${config.EndPionts}/analytics`).
            then(res => (res.json())).
            then(response => {
                setdata2([["Name", "Disbursement by gender"], ["Male", response.male], ["Female", response.female]])
            })
    }


    const columns = [
        { Header: "companies", accessor: "companies", align: "left" },
        { Header: "Number State", accessor: "state", align: "left" },
        { Header: "Number Beneficiaries", accessor: "beneficiaries", align: "left" },
        { Header: "Disbursement", accessor: "disbursement", align: "center" },
        { Header: "Total Payment", accessor: "payment", align: "center" },
        { Header: "completion", accessor: "completion", width: "20%", align: "center" },
    ]

    const rows = [
        {
            companies: <MDTypography variant="caption" color="text" fontWeight="medium">company Name</MDTypography>,
            state: (<MDTypography variant="caption" color="text" fontWeight="medium">0</MDTypography>),
            beneficiaries: (<MDTypography variant="caption" color="text" fontWeight="medium">2,400</MDTypography>),
            disbursement: (
                <MDTypography variant="caption" color="text" fontWeight="medium">
                    $14,000
                </MDTypography>
            ),
            payment: (<MDTypography variant="caption" color="text" fontWeight="medium">2,400</MDTypography>),
            completion: (
                <MDBox width="8rem" textAlign="left">
                    <a>50%</a>
                    <MDProgress value={60} color="info" variant="gradient" label={false} />
                </MDBox>
            )

        },
    ]
    useLayoutEffect(() => {
        fetchStats()
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid item xs={12} md={6} lg={12}>
                    <State />
                </Grid>
                <Grid container >
                    <Chart
                        chartType="BarChart"
                        width="100%"
                        height="400px"
                        data={data}
                        chartPackages={["corechart", "controls"]}
                        controls={[
                            {
                                controlType: "CategoryFilter",
                                options: {
                                    filterColumnIndex: 0,
                                    matchType: "any", // 'prefix' | 'exact',
                                    ui: {
                                        label: "Search by State",
                                    },
                                },
                            },
                        ]}
                    />
                    <Grid container flexWrap="nowrap" >
                        <Chart
                            chartType="PieChart"
                            data={ages}
                            options={{ title: "Age Distribution" }}
                            width={"475px"}
                            height={"300px"}
                        />
                        <Chart
                            chartType="PieChart"
                            data={gender}
                            options={{ title: "Gender Distribution" }}
                            width={"475px"}
                            height={"300px"}
                        />
                    </Grid>
                    <Grid container flexWrap="nowrap" >
                        <Chart
                            chartType="PieChart"
                            data={disability}
                            options={{ title: "Disabilty Distribution" }}
                            width={"475px"}
                            height={"300px"}
                        />
                        <Chart
                            chartType="PieChart"
                            data={maritalStatus}
                            options={{ title: "Marital Status" }}
                            width={"475px"}
                            height={"300px"}
                        />
                    </Grid>
                    <StateBars />
                    <Lines />
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}
export default LiveData;
