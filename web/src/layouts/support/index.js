import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import MDBox from 'components/MDBox'
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout'
import DashboardNavbar from 'examples/Navbars/DashboardNavbar'
import React from 'react'

function Support() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" }} pt={6} pb={3}>
                <Paper sx={{ width: 400, height: 350, p: 2, display: "flex", flexDirection: "column", gap: 2, alignItems:"center"}} elevation={3} >
                    <h5>Message Center</h5>
                    <TextField
                        label="Full Name"
                        sx={{ width: 300 }}
                        size='small'
                    />
                    <TextField
                        label="Phone"
                        sx={{ width: 300 }}
                        size='small'
                    />
                    <TextField
                        select
                        label="Department"
                        sx={{ width: 300 }}
                        //value={batch}
                        // onChange={(e) => setbatch(e.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                        size='small'
                    >
                        {["","Technician","Administrator","Staff"].map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </TextField>
                    <TextField
                        multiline
                        label="Message"
                        sx={{ width: 300, height: 150 }}
                        size='small'
                    />
                    <Button variant='standard' color='primary' >Send</Button>

                </Paper>


            </MDBox>
        </DashboardLayout>
    )
}

export default Support