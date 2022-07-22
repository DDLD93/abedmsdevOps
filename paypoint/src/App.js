import React, { useContext, useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import { AppBar, Card, Grid } from '@mui/material';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ModalStepper from './modalStepper';
import NavAppBar from './AppBar';
import { StateContext } from './context/context';
import SignIn from './Sign';
import WardList from './WardList';
import Localbase from 'localbase'

import config from './config';


const columns = [
  { field: 'name', headerName: 'Name', width: 200, align: "center" },
  { field: 'age', headerName: 'Age', type: 'number', width: 60, align: "center" },
  { field: 'gender', headerName: 'Gender', type: "singleSelect", width: 80 },
  { field: 'maritalStatus', headerName: 'Marital Status', width: 100 },
  { field: 'state', headerName: 'State', width: 90 },
  { field: 'lga', headerName: 'LGA', width: 90 },
  { field: 'ward', headerName: 'Ward', width: 90 },
  { field: 'phone', headerName: 'Phone', type: 'number', width: 120 },
  { field: 'status', headerName: 'Status', renderCell: (params) => (params.value), width: 150 },
  { field: 'actions', headerName: 'Action', width: 70, renderCell: (params) => (params.value), },
];

export default function App() {
  const { user, token,notification} = useContext(StateContext)
  const [rows, setrows] = useState([])
  const [count, setcount] = useState(0)
  const [loading, setloading] = useState(false)
  const [processed, setprocessed] = useState(0)
  let db = new Localbase('db').collection("beneList")

  async function sync() {
    setloading(true)
    setTimeout(()=>{
      rows.forEach(obj => {
        if (obj?.status === "paid") {
          let url = `${config.endPoint}/beneficiaries/process/${obj.id}`
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(obj)
          }).then(res => (res.json()))
            .then(res => {
            }).catch((err)=>{
            })
        }
      })
      setloading(false)
    },2000)
       
        //notification("MESSAGE","success")
      
  }


  function fetchBene() {
    setprocessed(0)
    db.get().then(arr => {
      setcount(arr.length)
      let list = arr.map(obj => {
        if(obj?.status === "paid") {
          setprocessed(prev=>prev+1)
        }
        return {
          id: obj.id,
          name: obj.fullName,
          age: obj.age,
          gender: obj.gender,
          maritalStatus: obj.maritalStatus,
          state: obj.state,
          lga: obj.lga,
          ward: obj.ward,
          phone: obj.phone,
          status: obj.status,
          biometric:obj?.biometric,
          identification:obj?.identification,
          payment:obj?.payment,
          actions: <ModalStepper
          userObj={obj}
          />,
        }
      })
      setrows(list)
    })
  }
  
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        fetchBene()
      }, 1000);  
    }
  }, [user])




  return (
    <>{!user ? <SignIn /> : <Grid height="100%" width="100%" sx={{ m: 0 }} container justifyContent="center" alignItems="center" >
      <NavAppBar
        count={count}
        processed={processed}
        loading={loading}
        sync={sync}
      />
      <Card sx={{ height: "85vh", width: "100%" }}>
        <Routes>
          <Route exact path="/" element={<WardList />} />
          <Route path="/table" element={<DataGrid rows={rows} columns={columns} />} />
        </Routes>
      </Card>
    </Grid>}

    </>
  );
}