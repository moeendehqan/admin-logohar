import { useEffect, useState } from "react"
import LoginCheck from "../functions/LoginCheck"
import Menu from "../componet/menu"

import { getCookie } from "../functions/Cookie"
import axios from "axios"
import { OnRun } from "../config/OnRun"
import { Outlet } from "react-router-dom"
const Desk = () =>{
    const [infoUser, setInfoUser]=useState(null)
    const id = getCookie('id')

    const getInfoUser = () =>{
        axios.post(OnRun+'/admin/getinfouser',{id:id})
        .then(response=>{
            if (response.data.reply) {
                setInfoUser(response.data.infouser)
            }
        })
    }




    LoginCheck()
    useEffect(getInfoUser,[])
    return(
        <div className="ly-desk">
            <Menu infoUser={infoUser}/>
            <Outlet />
        </div>
    )
}


export default Desk