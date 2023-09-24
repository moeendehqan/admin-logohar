import { useEffect, useState } from "react"
import { OnRun } from "../config/OnRun"
import axios from "axios"
import { useUser } from "../context/UserContext"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import LoginCheck from "../functions/LoginCheck"

const LoginBox = () =>{
    const [inputs,setInputs] = useState({username:'',password:'',captchaCode:null,captchaImg:null,captchaInp:''})
    const { login } = useUser();
    const navigate = useNavigate()
    const { user, logout } = useUser()





    const getCaptcha = () =>{
        axios.post(OnRun+'/getcaptcha')
        .then(response=>{
            setInputs({...inputs,captchaImg:response.data.img,captchaCode:response.data.captcha})

        })
    }

    const handleLogin  = () =>{
        axios.post(OnRun+'/admin/login',{username:inputs.username,password:inputs.password,captchaInp:inputs.captchaInp,captchaCode:inputs.captchaCode})
        .then(response=>{
            if(response.data.reply){
                login(response.data.id)
                navigate('/desk')
            }else{
                toast.warning(response.data.msg)
            }
        })
    }

    useEffect(getCaptcha,[])
    useEffect(()=>{
        if (user) {
            navigate('/')
            axios.post(OnRun+'/admin/checkid',{id:user})
            .then(response=>{
                if(response.data.reply){
                    navigate('/desk')
                }
            })
        }
    },[user])

    return(
        <form>
            <ToastContainer autoClose={3000} />
            <input value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})} type="text"></input>
            <input value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})} type="password"></input>
            {inputs.captchaImg == null ? null : <img onClick={getCaptcha} src={`data:image/png;base64,${inputs.captchaImg}`}></img>}
            <input value={inputs.captchaInp} onChange={(e)=>setInputs({...inputs,captchaInp:e.target.value})} type="text"></input>
            <button type="submit" onClick={handleLogin}>ورود</button>
        </form>
    )
}

export default LoginBox