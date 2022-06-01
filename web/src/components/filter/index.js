import { Grid, TextField } from '@mui/material'
import React from 'react'

function index() {
  return (
    <Grid container sx={{ justifyContent: "center", gap: 3 }} >
    <TextField
        select
        label="Batch"
        sx={{ width: 100 }}
        value={batch}
        onChange={(e) => setbatch(e.target.value)}
        SelectProps={{
            native: true,
        }}
        size='small'
    >
        {batchList.map((option) => (
            <option key={option.value} value={option.value}>
                {option.code}
            </option>
        ))}
    </TextField>                                        
    <TextField
        select
        label="State"
        sx={{ width: 100 }}
        value={state}
        onChange={(e) => setstate(e.target.value)}
        SelectProps={{
            native: true,
        }}
        size='small'
    >
         {stateList.map((option) => (
            <option key={option} value={option}>
                {option}
            </option>
        ))} 
    </TextField>                                        
    <TextField sx={{ width: 200, ml: 4 }} placeholder="Name Phone BVN NIN" size="small" label="Search" />


</Grid>
  )
}

export default index