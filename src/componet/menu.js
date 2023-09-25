import { setCookie } from "../functions/Cookie"
import { useNavigate } from "react-router-dom"
const Menu = (props) =>{
    const navigate = useNavigate()
    const menuList = [
        {url:'pallet',name:'پالت رنگی'},
        {url:'vector',name:'وکتور'},
        {url:'font',name:'فونت'},
    ]
    
    const Exit = () =>{
        setCookie('id','',0)
        navigate('/')
    }
    

    return(
        <div className="cm-menu">
            {
                props.infoUser?
                <div className="userBx">
                    <p>{props.infoUser.name}</p>
                    <button onClick={Exit}>خروج</button>
                </div>
                :null
            }
            {
                menuList.map(i=>{
                    return(
                        <p key={i.url} onClick={()=>navigate(i.url)} className="itemMenu">{i.name}</p>
                    )
                })
            }

        </div>
    )
}

export default Menu