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
import { CircularProgress, TextField, Typography } from "@mui/material";
import { StateContext } from "../../store/store"

import Profile from "./preview";
import config from "config";







function Beneficiaries() {

    const [loading, setLoading] = useState(false)
    const [isloading, setisloading] = useState(true)

    const [gettingList, setgettingList] = useState(false)
    const [bene, setbene] = useState([])
    const [beneBck, setbeneBck] = useState([])
    const [search, setSearch] = useState([])
    const [batch, setbatch] = useState([])
    const [state, setstate] = useState("")
    const [lga, setlga] = useState("")
    const [lgaList, setlgaList] = useState(["All"])
    const { batchList, token, notification } = useContext(StateContext)

    const filterByLga = () => {
        setbene(beneBck.filter(li => {
            return li.lga == lga
        }))

    }
    const filterBySearch = () => {
        setbene(beneBck.filter(li => {
            return li.fullName.includes(search) || li.phone.includes(search) 
        }))

    }

    function getLGAs() {
        setlgaList([])
        fetch(`${config.EndPionts}/beneficiaries/lga/${state}`).
            then(res => (res.json())).
            then(list => {
                setlgaList(list)
            })
    }

    const getBene = () => {
        setisloading(true)
        setgettingList(true)
        let url = `${config.EndPionts}/beneficiaries/state/${state}`
        fetch(url, {
            headers: {
                "Authorization": "Bearer " + token,
            },
        }).then(res => (res.json())).
            then(response => {
                console.log(response)
                setgettingList(false)
                setbene(response)
                setisloading(false)
                setbeneBck(response)
            }).catch(err => {
                notification("error", "An error ocuured fetching list")
                setisloading(false)
                setgettingList(false)
            })
    }
    const getAllBene = () => {
        setLoading(true)
        let url = `${config.EndPionts}/beneficiaries`
        fetch(url, {
            headers: {
                "Authorization": "Bearer " + token,
            },
        }).then(res => (res.json())).
            then(response => {
                console.log("ALL  >>>>>",response)
                setbene(response)
                setLoading(false)
                setbeneBck(response)
            }).catch(err => {
                notification("error", "An error ocuured fetching list")
                setisloading(false)
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

    const rows = bene.map(obj => {
        console.log("objeccts  >>>>>>",  obj)
        return {
            name: (<MDTypography component="a" href="#" variant="a" color="text" fontWeight="medium">
                {obj.fullName}
            </MDTypography>),
            state: <Job title={obj.state} description={obj.LGA} />,
            status: (
                <MDBox ml={-1}>
                    <MDBadge badgeContent={obj.status} color={obj.status === "processing" ? "warning" : obj.status == "paid" ? "success" : "error"} variant="gradient" size="sm" />
                </MDBox>
            ),
            phone: (
                <MDTypography component="a" href="#" variant="a" color="text" fontWeight="medium">
                    {obj.phone}
                </MDTypography>
            ),
            lga: (
                <MDTypography component="a" href="#" variant="a" color="text" fontWeight="medium">
                    {obj.lga}
                </MDTypography>
            ),
            // payment: (
            //     <MDBox ml={-1}>
            //         <MDBadge badgeContent={obj.isPaid} color={obj.isPaid == "approved" ? "success" : "error"} variant="gradient" size="sm" />
            //     </MDBox>
            // ),
            action: (
                <MDBox sx={{ display: "flex" }} ml={-1}>
                    <Profile
                        code={obj.code}
                        status={obj.status}
                        payment={obj.isPayment}
                        fullName={obj.fullName}
                        avatar={obj?.biometric?.imageHash}
                        gender={obj.gender}
                        disability={obj?.identification?.disability}
                        age={obj.age}
                        lga={obj.lga}
                        phone={obj.phone}
                        maritalStatus={obj.maritalStatus}
                        id={obj._id}
                        occupation={obj?.identification?.occupation}
                        state={obj.state}
                        ward={obj.ward}
                        idType={obj?.identification?.type}
                        idNo={obj?.identification?.idNo}
                        methodOfPayment={obj?.payment?.method}
                        paymentProof={obj?.payment?.imageHash}
                        details={`${obj?.payment?.bankName}: ${obj?.payment?.accNo}`}
                        timestamp={obj?.updatedAt}
                        remark={obj?.payment?.remark}
                    />
                </MDBox>
            ),
        }
    })


    const stateList = [
        "All",
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
        { Header: "Name", accessor: "name", width: "25%", align: "left" },
        { Header: "State", accessor: "state", align: "left" },
        { Header: "LGA", accessor: "lga", align: "center" },
        { Header: "Status", accessor: "status", align: "center" },
        { Header: "Phone", accessor: "phone", align: "center" },
        { Header: "Action", accessor: "action", align: "center" },
    ]
    useEffect(() => {
        getAllBene()
    },[])
    useEffect(() => {
        if (state) {
            if(state == 'All') {
                getAllBene()
            }else{
                getLGAs()
                getBene()
            }
        }
    }, [state])
    useEffect(() => {
        if (lga) {
            filterByLga()
        }
    }, [lga])
    useEffect(() => {
        setbene(beneBck)
        if (search.length > 1) {
            filterBySearch()
        }
    }, [search])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container flexDirection={"column"} spacing={0}>
                    {loading ? <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "400px", flexDirection: "column" }}>
                        <CircularProgress style={{ display: "block" }} size={55} color="success" />
                        <Typography mt={1} variant="p" textAlign={"center"} >
                            Fetching data
                        </Typography>
                    </div> :
                        <Grid item xs={12}>
                            <Card sx={{ minHeight: 400 }} >
                                <MDBox pt={3}>
                                    <Grid container sx={{ justifyContent: "center", gap: 3, pb: 2 }} >
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
                                            //onChange={(e) => setstate(e.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}
                                            size='small'
                                        >
                                            {["All", "Procssing", "Awaiting Payment", "Paid"].map((option, index) => (
                                                <option key={index} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </TextField>
                                        <TextField
                                            onChange={(e) => setSearch(e.target.value)}
                                            sx={{ width: 200, ml: 4 }} placeholder="Name Phone" size="small" label="Search" />


                                    </Grid>
                                    {rows.length == 0 ?
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", flexDirection: "column" }}>
                                            <Typography mt={1} variant="p" textAlign={"center"} >
                                                List will appear here
                                            </Typography>
                                        </div> : <DataTable
                                            table={{ columns, rows }}
                                            isSorted={false}
                                            entriesPerPage={false}
                                            showTotalEntries={true}
                                            noEndBorder
                                        />}
                                    {/* {gettingList && <Typography variant="h6" textAlign={"center"} >
                                        Fetching list ....
                                    </Typography>} */}

                                </MDBox>
                            </Card>
                        </Grid>}



                </Grid>
            </MDBox>
            {/* <Footer /> */}
        </DashboardLayout>
    );
}
export default Beneficiaries;