import { useEffect } from "react"
import { useUser } from "../context/UserContext"
import LoginCheck from "../functions/LoginCheck"

const Desk = () =>{
    const { user, logout } = useUser()
    LoginCheck()


    return(
        <div>
            Desk
        </div>
    )
}


export default Desk