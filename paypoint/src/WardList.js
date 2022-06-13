import React,{useState,useEffect,useContext} from 'react'
import Card from '@mui/material/Card';
import {Link} from "react-router-dom";
import { Grid, Typography } from '@mui/material'
import config from "./config"
import { StateContext } from './context/context';

function WardList(prop) {
    const [list, setlist] = useState([])
  const {token} = useContext(StateContext)
    function fetchDashboard() {
        fetch(`${config.endPoint}/paypoint/dashboard`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer "+ token,
            },
        }).
            then(res => res.json()).
            then(arr => {
                setlist(arr)
        }).
        catch(err=>console.log(err))
    }
    useEffect(() => {
      fetchDashboard()
    }, [])
    
    return (
        <Grid container gap={2} p={5}>
            {list.length < 1?
                <Typography textAlign="center" >You Have 0 wards assigned or currently offline  <Link to="/table" >Show offline data</Link></Typography>:
                list.map(ward => (
                    <Link style={{textDecoration:"none"}} to="/table">
                        <Card sx={{ width: 120, height: 100, p:1, bgcolor: "#00c3014f", decoration:"none" }}>
                            <p style={{fontSize:"20px", fontWeight:"bolder"}} >{ward}</p>
                            <span>{null}</span>
                            <p style={{textAlign:"end"}}><span>{`${0}/${0}`}</span></p>
                        </Card>
                    </Link>
                ))
        }

        </Grid>
    )
}

export default WardList