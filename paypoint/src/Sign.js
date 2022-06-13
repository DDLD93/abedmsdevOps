import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';
import logo from "./assets/logo.jpg"
import { StateContext } from './context/context';


export default function SignIn() {
    const [email, setemail] = React.useState("")
    const [password, setpassword] = React.useState("")
    const {Login,btn,setbtn} = React.useContext(StateContext)
    const handleSubmit = () => {
        Login({email,password})
    };
  React.useEffect(() => {
      if(!email || !password){
        setbtn(true)
      }else{
        setbtn(false)  
      }
  }, [email,password])
  
    return (
      
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar src={logo} sx={{ m: 1, width:150, height:150}}>
            </Avatar>
            <Typography component="h1" variant="h5">
                ABEDMS
            </Typography>
            <Box noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                onChange={(e)=>setemail(e.target.value)}
                type="email"
                required
                fullWidth
                label="Email"
              />
              <TextField
                margin="normal"
                onChange={(e)=>setpassword(e.target.value)}
                type="password"
                required
                fullWidth
                label="Password"
              />
              <Button
                onClick={handleSubmit}
                disabled={btn}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
    );
  }