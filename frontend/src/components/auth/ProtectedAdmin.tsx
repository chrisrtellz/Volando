import { Navigate } from "react-router-dom"

import {
  getCurrentUser
} from "../../data/auth"



function ProtectedAdmin({

  children

}:{

  children:React.ReactNode

}){


  const user = getCurrentUser()



  if(!user){


    return <Navigate to="/login"/>


  }




  if(user.role !== "admin"){


    return <Navigate to="/"/>


  }




  return children


}



export default ProtectedAdmin