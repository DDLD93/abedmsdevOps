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
        ["North East", 1],
        ["North West", 38],
        ["North Central", 1],
        ["South East", 1],
        ["South West", 1],
        ["South South", 1],
    ]
    const disability = [
        ["Disability", "Disbursement by disablity"],
        ["None", 38],
        ["Blind", 2],
        ["Deaf", 1],
        ["Cripple", 1],
        ["Metally-impaired", 1],
    ]
    const gender = [
        ["Gender", "Disbursement by gender"],
        ["Male", 10],
        ["Female", 28],
    ]
    const maritalStatus = [
        ["Marital Status", "Disbursement by Marital Status"],
        ["Married", 19],
        ["Single", 12],
        ["Window", 2],
        ["Divorce", 1],
    ]
    const data = [
        ["Name", "Disbursement by state"],
        ["abia", 0],
        ["adamawa", 0],
        ["akwa Ibom", 0],
        ["anambra",0],
        ["bauchi", 0],
        ["bayelsa", 0],
        ["benue", 0],
        ["borno", 0],
        ["cross River", 0],
        ["delta", 0],
        ["ebonyi", 0],
        ["edo", 0],
        ["ekiti", 0],
        ["enugu", 0],
        ["abuja", 0],
        ["gombe", 0],
        ["imo", 0],
        ["jigawa", 0],
        ["kaduna", 12],
        ["kano", 0],
        ["katsina", 15],
        ["kebbi", 0],
        ["kogi", 0],
        ["kwara", 0],
        ["lagos", 0],
        ["nasarawa", 0],
        ["niger", 0],
        ["ogun", 0],
        ["ondo", 0],
        ["osun", 0],
        ["oyo", 0],
        ["plateau", 10],
        ["rivers", 0],
        ["sokoto", 0],
        ["taraba", 0],
        ["yobe", 0],
        ["zamfara", 0]
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
