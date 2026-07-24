import { Navigate } from "react-router-dom"
import { isLogged } from "../../data/auth"


type Props = {

  children: React.ReactNode

}



function ProtectedRoute({children}:Props){


  const logged = isLogged()



  if(!logged){


    return <Navigate to="/login" />


  }



  return children


}


export default ProtectedRoute