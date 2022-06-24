
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import { useEffect, useState, useContext ,useLayoutEffect} from "react";


// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import BeneStats from "./beneStats";
import FundStats from "./fundStats";
import StateStats from "./stateStats";
import PspStats from "./pspStats";
import TrafficStats from "./trafficStats";
import UserStats from "./userStats";
import millify from "millify"
import config from "../../config";
import Analytics from "./analytics";
import SheetsStats from "./sheetStats";
function Dashboard() {
  const [stats, setstats] = useState("")
  const [total, settotal] = useState(0)
  const { sales, tasks } = reportsLineChartData;
  const fetchStats =()=>{
    fetch(`${config.EndPionts}/analytics`).
    then(res=>(res.json())).
    then(response=>{
      console.log(response)
      setstats(response)
    })  
  }
  useEffect(() => {
    settotal(stats.total)
    fetchStats()
  }, [])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
          <BeneStats
          title={"Beneficiaries"}
          count={millify(stats.total != null?stats.total:0)}
          percentage2={"%"+stats.perTotal}
          percentage1={"%"+stats.perTotal}
          
          />
          </Grid>
           <Grid item xs={12} md={6} lg={3}>
            <FundStats
            count={millify(stats.total != null?`${stats.total*20000}`:0)}
            percentage2={"%"+stats.perTotal}
            percentage1={"%"+stats.perTotal}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
          <StateStats
           count={stats?.userCount}
           />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <PspStats
            count={3}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TrafficStats
            count={stats?.userCount}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <UserStats
            count={stats?.userCount||0}
            percentage2={"%"+stats.userCount}
            percentage1={"%"+stats.perTotal}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Analytics
            count={stats?.userCount}
            percentage2={"%"+stats.userCount}
            percentage1={"%"+stats.perTotal}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <SheetsStats
            count={stats?.userCount}
            percentage2={"%"+stats.userCount}
            percentage1={"%"+stats.perTotal}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            {/* <MDBox mb={1.5}>
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
            </MDBox> */}
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            {/* <MDBox mb={1.5}>
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
            </MDBox> */}
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                 title="Website activities"
                 description="Activities in the past week"
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
                      Data for the last 10Weeks
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={12}>
              <Projects />
            </Grid>  */}
             <Grid item xs={12} md={6} lg={4}>
                {/* <PieChart title={"Line charts"} chart={reportsBarChartData}/>   */}
              {/* <OrdersOverview /> */}
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Dashboard;
