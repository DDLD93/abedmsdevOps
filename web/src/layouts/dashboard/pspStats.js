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
import { Lines } from 'layouts/live-data/pspLines';


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

function PspStats(prop) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <MDBox onClick={() => setOpen(true)} mb={1.5}>
        <ComplexStatisticsCard
           color="dark"
           icon="assured_workload"
           title="PSP"
           count={3}
           percentage2={{
             color: "success",
             amount: "0%",
             label: "Lowest psp",
           }}
           percentage={{
             color: "success",
             amount: "",
             label: "Leading PSP",
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
              PSP Summary
            </Typography>
            <Grid p={2} gap={1} container >
             <Lines/>

            </Grid>



            {/* <MDButton sx={{ mt: 4, ml: 9, mr: 9 }} size="small" variant="outlined" color="primary" >Generate Report</MDButton> */}
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default PspStats