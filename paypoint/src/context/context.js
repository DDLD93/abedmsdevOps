import { createContext, useState, useEffect } from "react";
import { useSnackbar } from 'notistack';
import config from "../config";
import Localbase from 'localbase'


export const StateContext = createContext();

export default function StateContextProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    const [btn, setbtn] = useState(true)
    const [wardList, setwardList] = useState([])
    const setUsers = () => setUser(JSON.parse(localStorage.getItem("user")) || null)
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const setTokens = () => setToken(localStorage.getItem("token"))
    const [beneList, setbeneList] = useState([])
    const [object, setObject] = useState({})
   
    const setObj = (key,value,id=null) => {
        setObject(prevState => ({
            ...prevState,
            [key]: value
        }));
        if(id){
            db.doc({id}).update({
                ...object,
                status:"paid"
            }).then(res=>notification("data saved to offline database")).catch(err => console.log("error >>>>", err))
        }
    }

    let db = new Localbase('db').collection("beneList")
    db.config.debug = false
    const clearIndexDB = ()=>{
        db.delete()
    }

    // let db = new Localbase('list_db').collection('list')
    const { enqueueSnackbar } = useSnackbar();
    const notification = (message, type = "info",) => {
        enqueueSnackbar(message, {
            variant: type,
            anchorOrigin: { vertical: "top", horizontal: "right" }
        });

    }
    const Login = (data) => {
        setbtn(false)
        fetch(`${config.endPoint}/paypoint/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(data),
        })
            .then((res) => {
                return res.json()
            })
            .then((response) => {
                if (response.status == "success") {
                    localStorage.setItem("user", JSON.stringify(response.user))
                    setUsers()
                    localStorage.setItem("token", response.token)
                    setTokens()
                    notification("Login Success", "success")
                    setbtn(false)
                    return
                }
                notification(response.message, "error")
                setbtn(false)
            }).catch((err) => {
                setbtn(false)
                notification(err.message, "error")
            });
    };
    function cacheBeneData() {
        fetch(`${config.endPoint}/beneficiaries/paypoint`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        }).
            then(res => res.json()).
            then(arr => {
                //setbeneList(arr)
                arr.forEach(obj => {
                    db.doc({ id: obj._id }).get().then(document => {
                        if (!document) {
                            console.log("Indexing document")
                            db.add({
                                id: obj._id,
                                fullName: obj.fullName,
                                age: obj.age,
                                gender: obj.gender,
                                maritalStatus: obj.maritalStatus,
                                state: obj.state,
                                lga: obj.lga,
                                ward: obj.ward,
                                phone: obj.phone,
                                status: obj.status,
                            }, obj._id)
                        }
                    }).catch(err => console.log("error indexing", err))

                })
            }).catch(err => console.log("error fetching", err))
        // db.get().then(docs => {
        //   })     
    }
    function fetchDashboard() {
        fetch(`${config.endPoint}/paypoint/dashboard`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
        }).
            then(res => res.json()).
            then(arr => {
                setwardList(arr)
            }).
            catch(err => console.log(err))
    }
    useEffect(() => {
        if (user) cacheBeneData()
    }, [user])
    const context = {
        notification,
        Login,
        setObj,
        clearIndexDB,
        setbtn,
        db,
        object,
        btn,
        wardList,
        beneList,
        token,
        user,

    }
    return <StateContext.Provider
        value={context}>
        {children}
    </StateContext.Provider>;
}