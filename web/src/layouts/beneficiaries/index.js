import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import LinearProgress from '@mui/material/LinearProgress';
import DataTable from "examples/Tables/DataTable";

// Data


import MDBadge from "components/MDBadge";
import { useContext, useEffect, useState } from "react";
import ModalBox from "./modal";
import { TextField } from "@mui/material";
import { StateContext } from "../../store/store"

import Profile from "./preview";
import config from "config";







function Beneficiaries() {
    
    const [loading, setloading] = useState(false)
    const [bene, setbene] = useState([])
    const [beneBck, setbeneBck] = useState([])
    const [search, setSearch] = useState([])
    const [batch, setbatch] = useState([])
    const [state, setstate] = useState([])
    const [lga, setlga] = useState([])
    const [lgaList, setlgaList] = useState([])
    const { batchList,token } = useContext(StateContext)

    const filterByLga = ()=>{
        setbene(beneBck.filter(li=>{
            return li.lga == lga
         }))
        
    }
    const filterBySearch = ()=>{
        setbene(beneBck.filter(li=>{
            return li.fullName.includes(search) || li.phone.includes(search)
         }))
        
    }

    function getLGAs() {
        console.log(state)
        fetch(`${config.EndPionts}/beneficiaries/lga/${state}`).
          then(res => (res.json())).
          then(list => {
              console.log(list)
            setlgaList(list)
          })
      }
    
    const getBene =()=>{
        let url = `${config.EndPionts}/beneficiaries/state/${state}`
        fetch(url,{
            headers: {
                "Authorization": "Bearer "+ token,
            },
        }).then(res=>(res.json())).
        then(response=>{
            setbene(response)
            setbeneBck(response)
        }).catch(err=>{
            console.log(err)
        })
    }

    const Job = ({ title, description }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                {title}
            </MDTypography>
            <MDTypography variant="caption">{description}</MDTypography>
        </MDBox>
    );
    
    const rows =  bene.map(obj => {
                    return {
                        author: (<MDTypography component="a" href="#" variant="a" color="text" fontWeight="medium">
                            {obj.fullName}
                        </MDTypography>),
                        function: <Job title={obj.state} description={obj.LGA} />,
                        status: (
                            <MDBox ml={-1}>
                                <MDBadge badgeContent={obj.status} color={obj.status == "processing" ? "warning" : obj.status == "paid"?"success":"error"} variant="gradient" size="sm" />
                            </MDBox>
                        ),
                        employed: (
                            <MDTypography component="a" href="#" variant="a" color="text" fontWeight="medium">
                                {obj.phone}
                            </MDTypography>
                        ),
                        action: (
                            <MDTypography component="a" href="#" variant="a" color="text" fontWeight="medium">
                                {obj.code}
                            </MDTypography>
                        ),
                        // payment: (
                        //     <MDBox ml={-1}>
                        //         <MDBadge badgeContent={obj.isPaid} color={obj.isPaid == "approved" ? "success" : "error"} variant="gradient" size="sm" />
                        //     </MDBox>
                        // ),
                        capture: (
                            <MDBox sx={{display:"flex"}} ml={-1}>                                  
                                    <Profile
                                    code={obj.code}
                                    status={obj.status}
                                    payment={obj.isPayment}
                                    fullName={obj.fullName}
                                    gender={obj.gender}
                                    disability={obj.disability}
                                    age={obj.age}
                                    lga={obj.lga}
                                    phone={obj.phone}
                                    maritalStatus={obj.maritalStatus}
                                    id={obj._id}
                                    occupation={obj.occupation}
                                    nextOfKin={obj.nextOfKin && obj.nextOfKin.fullName}
                                    nextOfKinPhone={obj.nextOfKin && obj.nextOfKin.phone}
                                    state={obj.state}
                                    ward={obj.ward}                
                                    idType={obj.identification && obj.identification.type}
                                    idNo={obj.identification && obj.identification.idNo}
                                    />
                            </MDBox>
                        ),
                    }
                })

  
    const stateList = [
        "",
        "abia",
        "adamawa",
        "akwa Ibom",
        "anambra",
        "bauchi",
        "bayelsa",
        "benue",
        "borno",
        "cross River",
        "delta",
        "ebonyi",
        "edo",
        "ekiti",
        "enugu",
        "abuja",
        "gombe",
        "imo",
        "jigawa",
        "kaduna",
        "kano",
        "katsina",
        "kebbi",
        "kogi",
        "kwara",
        "lagos",
        "nasarawa",
        "niger",
        "ogun",
        "ondo",
        "osun",
        "oyo",
        "plateau",
        "rivers",
        "sokoto",
        "taraba",
        "yobe",
        "zamfara"
      ]
    const columns = [
        { Header: "Name", accessor: "author", width: "25%", align: "left" },
        { Header: "Code", accessor: "action", align: "center" },
        { Header: "State", accessor: "function", align: "left" },
        { Header: "Status", accessor: "status", align: "center" },
        { Header: "Phone", accessor: "employed", align: "center" },
        { Header: "Action", accessor: "capture", align: "center" },
    ]

    useEffect(() => {
        if(state){
            getLGAs()
            getBene()
        }
    }, [state])
    useEffect(() => {
        if(lga){
            filterByLga()
        }
    }, [lga])
    useEffect(() => {
        setbene(beneBck)
        if(search.length > 1){
            console.log("search")
            filterBySearch()
        }
    }, [search])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container flexDirection={"column"} spacing={0}>

                    {loading == true ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: 400, flexDirection: "column" }} >
                            <Box sx={{ width: "200px" }}>
                                <LinearProgress color="secondary" />
                            </Box>

                        </div> :
                        <Grid item xs={12}>
                            <Card>
                                <MDBox pt={3}>
                                    <Grid container sx={{ justifyContent: "center", gap: 3 }} >
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
                                            {stateList.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </TextField>  
                                        <TextField
                                            select
                                            label="LGAs"
                                            sx={{ width: 100 }}
                                            value={lga}
                                            onChange={(e) => setlga(e.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            size='small'
                                        >
                                            {lgaList.map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </TextField>                                       
                                        <TextField
                                            select
                                            label="Status"
                                            sx={{ width: 100 }}
                                            value={state}
                                            onChange={(e) => setstate(e.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            size='small'
                                        >
                                             {["All","Procssing","Awaiting Payment","Paid"].map((option,index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))} 
                                        </TextField>                                        
                                        <TextField onChange={(e)=>setSearch(e.target.value)} sx={{ width: 200, ml: 4 }} placeholder="Name Phone" size="small" label="Search" />


                                    </Grid>
                                    <DataTable
                                        table={{ columns, rows }}
                                        isSorted={false}
                                        entriesPerPage={false}
                                        showTotalEntries={true}
                                        noEndBorder
                                    />
                                </MDBox>
                            </Card>
                        </Grid>}



                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}
export default Beneficiaries;