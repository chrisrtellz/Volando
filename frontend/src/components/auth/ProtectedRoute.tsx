import { Navigate } from "react-router-dom"

import {
  getCurrentUser
} from "../../data/auth"



type Props = {

children: React.ReactNode

role?:
| "cliente"
| "mensajero"
| "admin"

}





function ProtectedRoute({

children,

role

}:Props){



const user = getCurrentUser()






// NO HAY SESIÓN

if(!user){


return <Navigate to="/login" />


}








// CONTROL DE ROL


if(

role &&

user.role!==role

){



if(user.role==="cliente"){


return <Navigate to="/client-panel" />


}



if(user.role==="mensajero"){


return <Navigate to="/messenger" />


}



if(user.role==="admin"){


return <Navigate to="/admin" />


}


}








return children



}



export default ProtectedRoute