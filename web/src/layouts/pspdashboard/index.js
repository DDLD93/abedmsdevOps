/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";


// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components

import BeneStats from "./beneStats";
import FundStats from "./fundStats";

import TrafficStats from "./trafficStats";
import UserStats from "./userStats";
import config from "../../config"
import { useState,useEffect } from "react";

function PSPDashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [stats, setstats] = useState()

  const fetchStats = () =>{
    fetch(`${config.EndPionts}/analytics`).
    then(res => res.json()).
    then(res => setstats(res))
  }

  useEffect(() => {
    fetchStats()
  }, [])
  

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
          {/* <BeneStats
          title={"Beneficiaries"}
          // count={stats.total}
          // percentage2={stats.paid}
          // percentage1={11}
          // paid= {paid}
          
          /> */}
          </Grid>
           {/* <Grid item xs={12} md={6} lg={3}>
            <FundStats/>
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={3}>
          <StateStats/>
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={4}>
            <PspStats/>
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={3}>
            <TrafficStats/>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <UserStats/>
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count="0"
                percentage2={{
                  color: "success",
                  amount: "0%",
                  label: "Paid",
                }}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid> */}
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage2={{
                  color: "success",
                  amount: "55%",
                  label: "Paid",
                }}
                percentage={{
                  color: "success",
                  amount: "66",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Website live data"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Disbursment stats"
                  description={
                    <>
                      Data for the last 30days
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default PSPDashboard;
