import axios from "axios"
import { useNavigate } from "react-router-dom"
import { OnRun } from "../config/OnRun"
import { getCookie,setCookie } from "./Cookie"
import { useEffect } from "react"
const LoginCheck = () =>{


    const navigate = useNavigate()
    const id = getCookie('id')

    useEffect(()=>{
        if (id=='undefined') {
            navigate('/')
        }else{
            axios.post(OnRun+'/admin/checkid',{id:id})
            .then(response=>{
                if(!response.data.reply){
                    navigate('/')
                    setCookie('id','',0)
                }
            })
        }
    },[id])

}

export default LoginCheck