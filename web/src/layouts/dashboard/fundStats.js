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

function FundStats(prop) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <MDBox onClick={() => console.log("first")} mb={1.5}>
        <ComplexStatisticsCard
          color="error"
          icon="attach_money_icon"
          title="Funds"
          count={"#"+0}
          percentage2={{
            color: "success",
            amount: "0%",
            label: "Spent this week",
          }}
          percentage={{
            color: "success",
            amount: "0%",
            label: "Total Spent",
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
              Payment Summary
            </Typography>
            <Grid p={2} gap={1} container >
              <Typography textAlign="center" variant="p" component="h6">
                Payment Summary
              </Typography>
              <Grid p={3} gap={2} container >
                <TextField
                  size="small"
                  label="Amount Disbursed"
                  defaultValue={1100000}
                />
                <TextField
                  size="small"
                  label="Total Amount paid"
                  defaultValue={10000}
                />
                <TextField
                  size="small"
                  label="Total Beneficiaries paid"
                  defaultValue={5}
                />
                <TextField
                  size="small"
                  label="Number of state covered"
                  defaultValue={1}
                />
                 <TextField
                  size="small"
                  label="State with highiest payment"
                  defaultValue={"Kaduna"}
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

export default FundStats