import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Grid } from '@mui/material';
import Biodata from './steps/BioData';
import Biometric from './steps/Biometrics';
import Payment from './steps/Payment';
import Preview from './steps/Preview';

export default function CustomStepper(prop) {
    
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(2);

    let handleNextClose = prop.next 
    let user= prop.user  
    const handleModalNext = React.useCallback(() => {
        handleNextClose()
      }, [prop.next])

    const handleNext = () => {
        if (activeStep !== maxSteps - 1) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }else{
            handleModalNext()
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const steps = [
        {
            label: 'Bio-data update',
            component: <Biodata
            id={user._id}
            fullName={user.fullName}
            gender={user.gender}
            age={user.age}
            state={user.state}
            lga={user.lga}
            ward={user.ward}
            phone={user.phone}
            maritalStatus={user.maritalStatus}
            next={handleNext} 
            />,
        },
        {
            label: 'Biometric capture',
            component: <Biometric
            next={handleNext}
            />,
        },
        {
            label: 'Payment',
            component: <Payment
            next={handleNext}
            user={user.id}
            />,
        },
        {
            label: 'Preview',
            component: <Preview
            next={handleNext}
            user={user.id}
            />,
        },
    ];
    const maxSteps = steps.length;

    return (
        <Grid sx={{ flexGrow: 1, mb:3 }}>
            <MobileStepper
                variant="text"
                sx={{ width: "580px" }}
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled
                    //disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
            <Typography variant='h6' textAlign='center' >{steps[activeStep].label}</Typography>
             {steps[activeStep].component}
        </Grid>
    );
}
