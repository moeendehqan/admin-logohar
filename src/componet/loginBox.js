import { useEffect, useState} from "react"
import { OnRun } from "../config/OnRun"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import { setCookie ,getCookie} from "../functions/Cookie";

const LoginBox = () =>{

    const [inputs,setInputs] = useState({username:'',password:'',captchaCode:null,captchaImg:null,captchaInp:''})
    const navigate = useNavigate()
    const id = getCookie('id')

    const getCaptcha = () =>{
        axios.get(OnRun+'/captcha')
        .then(response=>{
            setInputs({...inputs,captchaImg:response.data.image, captchaCode:response.data.encrypted_response})
        })
    }

    const handleLogin  = () =>{
        axios.post(OnRun+'/admin/login',{username:inputs.username,password:inputs.password,captchaInp:inputs.captchaInp,captchaCode:inputs.captchaCode})
        .then(response=>{
                setCookie('id',response.data._id,5)
                navigate('/desk')
            })
        .catch(error=>{
            toast.warning(error.response.data.message)
        })
    }

    useEffect(getCaptcha,[])

    useEffect(()=>{
        if (id) {
            navigate('/')
            axios.post(OnRun+'/admin/cookie_check',{id:id})
                .then(response=>{
                    navigate('/desk')
                })
                .catch(error=>{
                    toast.warning(error.response.data.message)
                    setCookie('id','',0)
                })
        }
    },[id])

    return(
        <div className="cm-loginBox">
            <ToastContainer autoClose={3000} />
            <input placeholder="نام کاربری" value={inputs.username} onChange={(e)=>setInputs({...inputs,username:e.target.value})} type="text"></input>
            <input placeholder="رمزعبور" value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})} type="password"></input>
            {inputs.captchaImg == null ? null : <img onClick={getCaptcha} src={`data:image/png;base64,${inputs.captchaImg}`}></img>}
            <input placeholder="کد کپچا" value={inputs.captchaInp} onChange={(e)=>setInputs({...inputs,captchaInp:e.target.value})} type="text"></input>
            <button onClick={handleLogin}>ورود</button>
        </div>
    )
}

export default LoginBox