import { Card, Grid } from '@mui/material'
import MDBox from 'components/MDBox'
import MDProgress from 'components/MDProgress'
import MDTypography from 'components/MDTypography'
import DataTable from 'examples/Tables/DataTable'
import React from 'react'

function State() {
    const columns = [
        { Header: "states", accessor: "state", align: "left" },
        { Header: "Number of Beneficiaries", accessor: "bene", align: "left" },
        { Header: "Funds Disbursement", accessor: "disbursment", align: "left" },
        { Header: "Total funds paid", accessor: "paid", align: "center" },
        { Header: "completion", accessor: "completion", width: "20%", align: "center" },
    ]
    const rows = [
        {
            state: (<MDTypography variant="caption" color="text" fontWeight="medium">company Name</MDTypography>),
            bene: (<MDTypography variant="caption" color="text" fontWeight="medium">11</MDTypography>),
            disbursment: (<MDTypography variant="caption" color="text" fontWeight="medium">2,400</MDTypography>),
            paid: (
                <MDTypography variant="caption" color="text" fontWeight="medium">
                    $14,000
                </MDTypography>
            ),
            completion: (
                <MDBox width="8rem" textAlign="left">
                    <a>50%</a>
                    <MDProgress value={60} color="info" variant="gradient" label={false} />
                </MDBox>
            ),
        },
    ]
  return (
    <MDBox pt={6} pb={3}>
    <Grid item xs={12} md={6} lg={12}>
        <Card>
            <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            </MDBox>
            <MDBox>
                <DataTable
                    table={{ columns, rows }}
                    showTotalEntries={false}
                    isSorted={false}
                    noEndBorder
                    entriesPerPage={false}
                />
            </MDBox>
        </Card>
    </Grid>
</MDBox>
  )
}

export default State