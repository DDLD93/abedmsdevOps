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

import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDSnackbar from "components/MDSnackbar";
import { DataGrid, GridToolbar,GridFilterPanel  } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';



// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { StateContext } from "store/store";
import { useContext } from "react";

function Reports() {
 const {bene} = useContext(StateContext)
 
  const columns = [
    {field: 'Name', headerName: 'Name', width: 200, sortable: false,onColumnHeaderClick: ()=>console.log("first"), onCellClick: ()=>console.log("first")},
    {field: 'Gender', headerName: 'Gender', sortable: false, onCellClick: ()=>console.log("first")},
    {field: 'Phone', headerName: 'Phone',width: 120, color:"blue", sortable: false, onCellClick: ()=>console.log("first"),},
    {field: 'Occupation', headerName: 'Occupation', sortable: false, onCellClick: ()=>console.log("first")},
    {field: 'Batch', headerName: 'Batch', sortable: false, onCellClick: ()=>console.log("first"),},
    {field: 'Disability', headerName: 'Disability', sortable: false, onCellClick: ()=>console.log("first")},
    {field: 'State', headerName: 'State', sortable: false, onCellClick: ()=>console.log("first")},
    {field: 'LGA', headerName: 'lga', sortable: false, onCellClick: ()=>console.log("first")},
    // {field: 'Geo-Political Zone', headerName: 'Geo-Political Zone', sortable: false, generateData: ()=>console.log("first"), renderCell: ()=>console.log("data"),},
    {field: 'Status', headerName: 'Status', sortable: false, onCellClick: ()=>console.log("first")},
  ];

  const rows = bene.map(obj=>{
    return {id: obj._id, Name:obj.fullName, Gender:obj.gender,Phone:obj.phone,Occupation:obj.occupation,Batch:obj.batch,Disability:obj.disability,State:obj.state,lga:obj.lga,Status:obj.status,onCellClick: ()=>console.log("first")}

  })
 useEffect(() => {
 
 }, [])
 


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ height: 600, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
        <DataGrid disableColumnFilter={false} columns={columns} rows={rows} components={{ Toolbar:GridToolbar }} />
        </div>
      </div>
    </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Reports;
function CustomToolbar(props) {
  const classes = useToolbarStyles();
  const toolbarContext = useContext(ToolbarContext);
  return (
      <Collapse in={toolbarContext.toolbar}>
          <GridToolbarContainer className={classes.root}>
              <GridColumnsToolbarButton />
              <GridFilterToolbarButton />
              <GridDensitySelector />
              <GridToolbarExport />
          </GridToolbarContainer>
      </Collapse>
  );
 }
