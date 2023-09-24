import axios from "axios"
import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { OnRun } from "../config/OnRun"

const LoginCheck = () =>{


    const { user, logout } = useUser()

    const navigate = useNavigate()
    if (!user) {
        navigate('/')
    }else{
        axios.post(OnRun+'/admin/checkid',{id:user})
        .then(response=>{
            if(!response.data.reply){
                navigate('/')
            }
        })
    }

}

export default LoginCheck