import { createContext, useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import Views from "layouts/batches/view";
import MDBadge from "components/MDBadge";
import MDProgress from "components/MDProgress";
import config from "../config"

export const StateContext = createContext();

export default function StateContextProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const setUsers = () => setUser(JSON.parse(localStorage.getItem("user")) || null)
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const setTokens = () => setToken(localStorage.getItem("token"))
    const [rows, setrows] = useState([])
    const [bene, setbene] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const [isBtn, setisBtn] = useState(false)
    const btnState = (e) => setisBtn(e)
    const [batchList, setbatchList] = useState([])
    const [object, setObject] = useState({})
    const updateObject =(obj)=>{
        setObject(prev => ({...prev,obj}))
        console.log(object)
    }

    const [psp, setpsp] = useState([])

    const notification = (type = "info", message) => {
        enqueueSnackbar(message, {
          variant: type,
          anchorOrigin: { vertical: "top", horizontal: "right" }
        });
    
      }

    const [loading, setLoading] = useState(false)
    const changeLoading = (e) => setLoading(e)

    const getBene =()=>{
        fetch(`${config.EndPionts}/beneficiaries`,{
            headers: {
                "Authorization": "Bearer "+ token,
            },
        }).then(res=>(res.json())).
        then(response=>{
            setbene(response)
        })
    }
    
    const fetchpsp = () => {
        fetch(`${config.EndPionts}/user/psp`)
            .then(res => res.json())
            .then(response => {
                console.log("psp response >>>>>", response)
                setpsp(response)
            })
    }          

    const fetchBatch = () => {
        const Job = ({ title, description }) => (
            <MDBox lineHeight={1} textAlign="left">
                <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
                    {title}
                </MDTypography>
                <MDTypography variant="caption">{description}</MDTypography>
            </MDBox>
        );
        const Progress = ({ color, value }) => (
            <MDBox display="flex" alignItems="center">
                <MDTypography variant="caption" color="text" fontWeight="medium">
                    {value}%
                </MDTypography>
                <MDBox ml={0.5} width="9rem">
                    <MDProgress variant="gradient" color={color} value={value} />
                </MDBox>
            </MDBox>
        );
        fetch(`${config.EndPionts}/batch/`).
            then(res => {
                return res.json()
            }).
            then(res => {
                setbatchList(prev=>[...prev,...res])
            let map = res.map(obj => {
                    return {
                        code: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.code}
                            </MDTypography>
                        ),
                        name: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.name}
                            </MDTypography>
                        ),
                        states: <Job title={obj.states.length} description={""} />,
                        completion: <Progress color="success" value={obj.progress} />,
                        status: (
                            <MDBox ml={-1}>
                                <MDBadge badgeContent={obj.status} color={obj.status=="active"?"success":"warning"} variant="gradient" size="sm" />
                            </MDBox>
                        ),
                        start: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.startingDate.split("T")[0]}
                            </MDTypography>
                        ),
                        close: (
                            <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
                                {obj.closingDate.split("T")[0]}
                            </MDTypography>
                        ),
                        action: (
                            <MDBox ml={-1}>
                                <Views
                                    closingDate={obj.closingDate.split("T")[0]}
                                    startingDate={obj.startingDate.split("T")[0]}
                                    states={obj.states}
                                    code={obj.code}
                                    name={obj.name}
                                    total={obj.total}
                                    enroll={obj.enroll}
                                    id={obj._id}
                                />
                            </MDBox>
                        )

                    }
                })
                setrows(map)
            })
    }
    const Login = (data) => {
        setLoading(true)
        console.log(data)
        fetch(`${config.EndPionts}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                return res.json()
            })
            .then((response) => {
                if (response.status == "success") {
                    localStorage.setItem("user", JSON.stringify(response.user))
                
                    localStorage.setItem("token",response.token)
                    setToken(localStorage.getItem("token"))
                    setLoading(false)
                    notification("success", "Login Success")
                    return
                }
                notification("error", response.message)
                setLoading(false)
            }).catch((err) => {
                notification("error", err.message)
                setLoading(false)
            });
    };
    const LoginPSP = (data) => {
        setLoading(true)
        //console.log(data)
        fetch(`${config.EndPionts}/psp/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                return res.json()
            })
            .then((response) => {
                if (response.status == "success") {
                    localStorage.setItem("user", JSON.stringify(response.user))
                
                    localStorage.setItem("token",response.token)
                    setToken(localStorage.getItem("token"))
                    setLoading(false)
                    notification("success", "Login Success")
                    return
                }
                notification("error", response.message)
                setLoading(false)
            }).catch((err) => {
                notification("error", err.message)
                setLoading(false)
            });
    };

    useEffect(() => {
        getBene()
        setUsers()
        setTokens()
        fetchBatch()
        fetchpsp()
    }, []);
    const context = {
        user,
        LoginPSP,
        fetchBatch,
        fetchpsp,
        notification,
        setUser,
        Login,
        btnState,
        updateObject,
        changeLoading,
        object, 
        bene,
        psp,
        token,
        isBtn,
        rows,
        batchList,
        loading,
    }
    return <StateContext.Provider
        value={context}>
        {children}
    </StateContext.Provider>;
}