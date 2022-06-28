import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import MDButton from 'components/MDButton';
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import { Card, Grid, TextField } from '@mui/material';
import MDBox from 'components/MDBox';


const style = {
  modal: {
    position: 'absolute',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: "80%",
    bgcolor: 'background.paper',
  },
  card: {
    display: "flex",
    gap: 3,
    width: "100%",
    padding: "25px",
    justifyContent: "space-between"
  }
};

function SheetsStats(prop) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <MDBox onClick={handleOpen} mb={1.5}>
        <ComplexStatisticsCard
             icon="backup_icon"
             color="warning"
             title="Sheets"
             count={2}
            percentage2={{
            color: "success",
            amount: prop.percentage2,
            label: "Uploads",
          }}
          percentage={{
            color: "success",
            amount: prop.percentage1 && 2,
            label: "uploads in the past week",
          }}
        />
      </MDBox>
      <Modal

        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box container sx={style.modal}>
            <Typography textAlign="center" variant="h4" component="h6">
              Beneficiary Summary
            </Typography>
            <Grid p={2} gap={1} container >
              <Typography textAlign="center" variant="p" component="h6">
                Beneficiary Summary
              </Typography>
              <Grid p={3} gap={2} container >
                <TextField
                  size="small"
                  label="Total Beneficiaries"
                  defaultValue={0}
                />
                <TextField
                  size="small"
                  label="Total Beneficiaries verified"
                  defaultValue={0}
                />
                <TextField
                  size="small"
                  label="Total Beneficiaries paid"
                  defaultValue={0}
                />
                <TextField
                  size="small"
                  label="Number of state covered"
                  defaultValue={0}
                />
                 <TextField
                  size="small"
                  label="State with highiest quota"
                  defaultValue={0}
                />
              </Grid>
              <Typography textAlign="center" variant="p" component="h6">
              Summary by States
              </Typography>
              <Grid p={3} gap={2} container >
                <TextField
                  size="small"
                  label="Total Beneficiaries"
                />
                <TextField
                  size="small"
                  label="Total Beneficiaries verified"
                />
                <TextField
                  size="small"
                  label="Total Beneficiaries paid"
                />
              </Grid>

            </Grid>



            <MDButton sx={{ mt: 4, ml: 9, mr: 9 }} size="small" variant="outlined" color="primary" >Generate Report</MDButton>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default SheetsStats